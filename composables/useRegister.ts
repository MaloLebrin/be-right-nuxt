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
  siret: string
  address: string
  postalCode: string
  city: string
  phone: string
}

/**
 * Interface définissant les valeurs du formulaire de l'étape 3
 */
interface Step3Values {
  employees?: EmployeeType[]
}

/**
 * Hook pour gérer le processus d'inscription en plusieurs étapes
 * @returns {Object} Un objet contenant toutes les fonctions et états nécessaires pour l'inscription
 */
export const useRegister = () => {
  const { $toast, $api, $pinia } = useNuxtApp()
  const uiStore = useUiStore($pinia)
  const { storeUsersEntities } = userHook()
  const { storeCompanyEntities } = companyHook()
  const { jwtDecode, getCookie } = authHook()
  const { IncLoading, DecLoading } = uiStore
  const authStore = useAuthStore($pinia)
  const { setJWTasUser, setToken } = authStore
  const router = useRouter()

  const currentStep = ref(1)
  const totalSteps = 3
  const companyId = ref<number | null>(null)

  // État pour chaque étape
  const step1Values = ref<Step1Values>({
    roles: RoleEnum.PHOTOGRAPHER,
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const step2Values = ref<Step2Values>({
    siret: '',
    address: '',
    postalCode: '',
    city: '',
    phone: '',
  })

  const step3Values = ref<Step3Values>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    addressLine: '',
    addressLine2: null,
    postalCode: '',
    city: '',
    country: 'France',
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
      password: string().required('Le mot de passe est requis'),
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
  async function handleStep1Submit(values: Step1Values) {
    step1Values.value = values
    currentStep.value++
  }

  /**
   * Gère la soumission du formulaire de l'étape 2
   * Crée l'entreprise et récupère son ID
   * @param {Step2Values} values - Les valeurs du formulaire de l'étape 2
   * @throws {Error} Si la création de l'entreprise échoue
   */
  async function handleStep2Submit(values: Step2Values) {
    step2Values.value = values
    try {
      const { data } = await $api().post<{ company: Company }>('company', {
        name: step1Values.value.companyName,
        siret: values.siret,
        address: values.address,
        postalCode: values.postalCode,
        city: values.city,
        phone: values.phone,
      })
      if (data?.company) {
        companyId.value = data.company.id
      }
    } catch (error) {
      console.error(error)
      $toast.danger('Une erreur est survenue lors de la création de l\'entreprise')
      return
    }
    currentStep.value++
  }

  /**
   * Gère la création d'un destinataire
   * Finalise l'inscription après la création du destinataire
   */
  async function handleRecipientCreated() {
    $toast.success('Destinataire créé avec succès')
    await submitregister({
      ...step1Values.value,
      ...step2Values.value,
      ...step3Values.value,
    })
  }

  /**
   * Gère la soumission du formulaire de l'étape 3
   * @param {Step3Values} values - Les valeurs du formulaire de l'étape 3
   */
  async function handleStep3Submit(values: Step3Values) {
    step3Values.value = values
    await submitregister({
      ...step1Values.value,
      ...step2Values.value,
      ...values,
    })
  }

  /**
   * Soumet le formulaire d'inscription complet
   * Gère l'authentification et la redirection après une inscription réussie
   * @param {VeeValidateValues} form - Les valeurs du formulaire complet
   * @throws {Error} Si l'inscription échoue
   */
  async function submitregister(form: VeeValidateValues) {
    const cookieToken = getCookie()
    IncLoading('Inscription en cours...')

    try {
      const { data } = await $api().post<{ user: UserType; company: Company }>('user/signup', form as WithoutId<UserType>)
      
      if (data) {
        const { user, company } = data
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

          $toast.success(`Bienvenue ${getUserfullName(user)}`)
          router.replace({
            name: authStore.isAuthUserAdmin ? RouteNames.ADMIN_EVENTS : RouteNames.LIST_EVENT,
          })
        }
      }
    } catch (error) {
      console.error(error)
      $toast.danger('Une erreur est survenue lors de l\'inscription')
    }

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
    handleRecipientCreated,
    submitregister,
  }
} 
