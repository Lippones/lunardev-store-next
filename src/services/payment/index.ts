export async function completeCheckout() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const isSuccess = Math.random() > 0.5 // 50% chance of success

  if (isSuccess) {
    return {
      status: 200,
      data: {
        success: true,
        message: 'Compra realizada com sucesso.',
      },
    }
  } else {
    throw new Error('Erro ao realizar a compra.')
  }
}
