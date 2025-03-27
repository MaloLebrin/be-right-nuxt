import { object, string } from 'yup'
import type { ObjectSchema } from 'yup'
import type { EmployeeType, UserType, VeeValidateValues, WithoutId } from '@/types'
import type { Company } from '~~/store'
import { useAuthStore, useUiStore } from '~~/store'
import { RouteNames } from '~/helpers/routes'
import { RoleEnum } from '~/types'
import { ref } from 'vue'
import type { SubmissionHandler } from 'vee-validate'

/**
 * Interface définissant les valeurs du formulaire de l'étape 1
 */
interface Step1Values {
  roles: RoleEnum
  companyName: string
  firstName: string
  lastName: string
  email: string
  password: string
}

/**
 * Interface définissant les valeurs du formulaire de l'étape 2
 */
interface Step2Values {
  logo: string
  siret: string
  color: string
  address: string
  postalCode: string
  city: string
  phone: string
}

/**
 * Interface définissant les valeurs du formulaire de l'étape 3
 */
interface Step3Values {
  employees?: {
    email: string
    firstName: string
    lastName: string
    phone: string
    addressLine: string
    addressLine2: string | null
    postalCode: string
    city: string
    country: string
  }[]
}

/**
 * Hook pour gérer le processus d'inscription en plusieurs étapes
 * @returns {Object} Un objet contenant toutes les fonctions et états nécessaires pour l'inscription
 */
export const useRegister = () => {
  const { $toast, $api, $pinia } = useNuxtApp()
  const uiStore = useUiStore($pinia)
  const { storeUsersEntities } = userHook()
  const { storeCompanyEntities, patchOne } = companyHook()
  const { jwtDecode, getCookie } = authHook()
  const { IncLoading, DecLoading, resetLoading } = uiStore
  const authStore = useAuthStore($pinia)
  const { setJWTasUser, setToken } = authStore
  const router = useRouter()

  const currentStep = ref(1)
  const totalSteps = 3
  const companyId = ref<number | null>(null)

  // État pour chaque étape
  const step1Values = ref<Step1Values>({
    roles: RoleEnum.OWNER,
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const step2Values = ref<Step2Values>({
    logo: '',
    siret: '',
    color: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
  })

  const step3Values = ref<Step3Values>({
    employees: [{
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      addressLine: '',
      addressLine2: null,
      postalCode: '',
      city: '',
      country: 'France',
    }],
  })

  // Schémas de validation par étape
  const stepSchemas: Record<number, ObjectSchema<any>> = {
    1: object({
      roles: string()
        .oneOf([RoleEnum.PHOTOGRAPHER, RoleEnum.OWNER], 'Vous devez renseigner un rôle')
        .required('Le rôle est requis'),
      companyName: string().required('Le nom de l\'entreprise est requis'),
      firstName: string().required('Le prénom est requis'),
      lastName: string().required('Le nom est requis'),
      email: string().email('vous devez entrer un email valide').required('L\'adresse email est requise'),
      password: string()
        .required('Le mot de passe est requis')
      // .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
      // .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
      // .matches(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
      // .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
    }),
    2: object({
      siret: string().when('roles', {
        is: RoleEnum.OWNER,
        then: schema => schema.required('Le numéro SIRET est requis'),
        otherwise: schema => schema.nullable(),
      }),
      address: string().when('roles', {
        is: RoleEnum.OWNER,
        then: schema => schema.required('L\'adresse est requise'),
        otherwise: schema => schema.nullable(),
      }),
      postalCode: string().when('roles', {
        is: RoleEnum.OWNER,
        then: schema => schema.required('Le code postal est requis'),
        otherwise: schema => schema.nullable(),
      }),
      city: string().when('roles', {
        is: RoleEnum.OWNER,
        then: schema => schema.required('La ville est requise'),
        otherwise: schema => schema.nullable(),
      }),
      phone: string().when('roles', {
        is: RoleEnum.OWNER,
        then: schema => schema.required('Le numéro de téléphone est requis'),
        otherwise: schema => schema.nullable(),
      }),
    }),
    3: object({
      email: string().email('vous devez entrer un email valide').required('L\'adresse email est requise'),
      firstName: string().required('Le prénom est requis'),
      lastName: string().required('Le nom est requis'),
      phone: string().required('Le numéro de téléphone est requis'),
      addressLine: string().required('L\'adresse est requise'),
      addressLine2: string().nullable(),
      postalCode: string().required('Le code postal est requis'),
      city: string().required('La ville est requise'),
      country: string().required('Le pays est requis'),
    }),
  }

  /**
   * Retourne à l'étape précédente si possible
   */
  function previousStep() {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  /**
   * Gère la soumission du formulaire de l'étape 1
   * @param {Step1Values} values - Les valeurs du formulaire de l'étape 1
   */
  const handleStep1Submit: SubmissionHandler<Step1Values> = values => {
    step1Values.value = values
    currentStep.value++
  }

  /**
   * Gère la soumission du formulaire de l'étape 2
   * Crée l'entreprise et récupère son ID
   * @param {Step2Values} values - Les valeurs du formulaire de l'étape 2
   * @throws {Error} Si la création de l'entreprise échoue
   */
  function handleStep2Submit(values: Step2Values) {
    step2Values.value = values
    currentStep.value++
  }

  /**
   * Gère la soumission du formulaire de l'étape 3
   * @param {Step3Values} values - Les valeurs du formulaire de l'étape 3
   */
  async function handleStep3Submit(values: Step3Values) {
    step3Values.value = values
  }

  /**
   * Soumet le formulaire d'inscription complet
   * Gère l'authentification et la redirection après une inscription réussie
   * @param {VeeValidateValues} form - Les valeurs du formulaire complet
   * @throws {Error} Si l'inscription échoue
   */
  async function submitregister(form: VeeValidateValues) {
    IncLoading('Inscription en cours...')

    const { user, company } = await createUserAndCompany({
      ...step1Values.value,
    })

    if (!company || !user) {
      $toast.danger('Une erreur est survenue lors de la création de l\'entreprise')
      resetLoading()
      return
    }

    await updateCompanyInfo({
      companyId: company.id,
      form: step2Values.value,
    })


    $toast.success(`Bienvenue ${getUserfullName(user)}`)
    router.replace({
      name: authStore.isAuthUserAdmin ? RouteNames.ADMIN_EVENTS : RouteNames.LIST_EVENT,
    })

    DecLoading()
  }

  /**
   * Crée un utilisateur et une entreprise
   * @param {VeeValidateValues} form - Les valeurs du formulaire
   * @returns {Promise<{ user: UserType | null; company: Company | null }>} Un objet contenant l'utilisateur et l'entreprise créés
   */
  async function createUserAndCompany(form: VeeValidateValues) {
    const cookieToken = getCookie()
    IncLoading('Création de l\'entreprise en cours...')

    let createdUser: UserType | null = null
    let createdCompany: Company | null = null

    try {
      const { data } = await $api().post<{ user: UserType; company: Company }>('user/signup', form as WithoutId<UserType>)

      if (data) {
        const { user, company } = data
        createdUser = user
        createdCompany = company
        if (user?.token && company) {
          $api().setCredentials(user.token)
          storeCompanyEntities(company)
          storeUsersEntities(user, false)
          cookieToken.value = user.token
          const decode = jwtDecode(ref(user.token))
          setToken(user.token)

          if (decode.value) {
            setJWTasUser(decode.value)
          }
        }
      }
    } catch (error) {
      console.error(error)
      $toast.danger('Une erreur est survenue lors de la création de l\'entreprise')
    } finally {
      DecLoading()
    }
    return { user: createdUser, company: createdCompany }
  }

  /**
   * Met à jour les informations de l'entreprise
   * @param {number} companyId - L'ID de l'entreprise
   * @param {Step2Values} form - Les valeurs du formulaire
   */
  async function updateCompanyInfo({
    companyId,
    form,
  }: {
    companyId: number
    form: Step2Values
  }) {
    IncLoading('Mise à jour des informations de l\'entreprise en cours...')
    const { color, siret } = form
    await patchOne(companyId, {
      color,
      siret,
    })
    DecLoading()
  }

  return {
    currentStep,
    totalSteps,
    companyId,
    step1Values,
    step2Values,
    step3Values,
    stepSchemas,
    previousStep,
    handleStep1Submit,
    handleStep2Submit,
    handleStep3Submit,
    submitregister,
  }
}

