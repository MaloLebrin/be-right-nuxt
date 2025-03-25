import { object, string } from 'yup'
import type { ObjectSchema } from 'yup'
import type { UserType, VeeValidateValues, WithoutId } from '@/types'
import type { Company } from '~~/store'
import { useAuthStore, useUiStore } from '~~/store'
import { RouteNames } from '~/helpers/routes'
import { RoleEnum } from '~/types'

interface Step1Values {
  roles: RoleEnum
  companyName: string
  firstName: string
  lastName: string
  email: string
  password: string
}

interface Step2Values {
  siret: string
  address: string
  postalCode: string
  city: string
  phone: string
}

interface Step3Values {
  email: string
  firstName: string
  lastName: string
  phone: string
  addressLine: string
  addressLine2: string | null
  postalCode: string
  city: string
  country: string
}

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

  function previousStep() {
    if (currentStep.value > 1) {
      currentStep.value--
    }
  }

  async function handleStep1Submit(values: Step1Values) {
    step1Values.value = values
    currentStep.value++
  }

  async function handleStep2Submit(values: Step2Values) {
    step2Values.value = values
    // Créer l'entreprise et récupérer son ID
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

  async function handleRecipientCreated() {
    $toast.success('Destinataire créé avec succès')
    await submitregister({
      ...step1Values.value,
      ...step2Values.value,
      ...step3Values.value,
    })
  }

  async function handleStep3Submit(values: Step3Values) {
    step3Values.value = values
    await submitregister({
      ...step1Values.value,
      ...step2Values.value,
      ...values,
    })
  }

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
