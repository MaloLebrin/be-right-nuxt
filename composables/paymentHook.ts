export default function paymentHook() {
  async function fetchAllByUser() {
    const { data } = await useFetch('/api/stripe/payments/list', {
      method: 'get',
    })
    console.log(data.value, '<==== data')
    return data.value
  }

  return {
    fetchAllByUser,
  }
}
