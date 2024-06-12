import Image from 'next/image'
import SuccessImage from '@/assets/undraw_payments.svg'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { CircleX } from 'lucide-react'

interface PaymentMessageProps {
  paymentStatus: 'success' | 'error'
  closeModal: () => void
}

export function PaymentMessage({
  paymentStatus,
  closeModal,
}: PaymentMessageProps) {
  const router = useRouter()

  function handleClose() {
    if (paymentStatus === 'error') closeModal()
    else router.push('/')
  }

  return (
    <div className="fixed inset-0 h-screen w-screen z-50 bg-gray-600/50 flex items-center justify-center">
      <div className="w-full max-w-[600px] bg-card border rounded-lg p-8 relative">
        <div>
          {paymentStatus === 'success' ? (
            <>
              <h2 className="text-xl font-semibold">Pagamento aprovado!</h2>
              <p className="text-muted text-sm mt-2">
                Seu pedido foi aprovado com sucesso. Em breve você receberá um
                e-mail com os detalhes da sua compra.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold">Erro no pagamento</h2>
              <p className="text-muted text-sm mt-2">
                Houve um erro ao processar seu pagamento. Por favor, tente
                novamente.
              </p>
            </>
          )}
        </div>
        <div className="flex justify-center mt-6">
          {paymentStatus === 'success' ? (
            <Image width={400} src={SuccessImage} alt="pagamento" />
          ) : (
            <CircleX size={150} className="text-red-500" />
          )}
        </div>
        <Button onClick={handleClose} size="lg" className="w-full mt-10">
          {paymentStatus === 'success' ? 'Volar para home' : 'Tentar novamente'}
        </Button>
      </div>
    </div>
  )
}
