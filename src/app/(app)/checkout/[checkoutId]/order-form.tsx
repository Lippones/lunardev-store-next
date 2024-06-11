'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreditCard, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useHookFormMask } from 'use-mask-input'

const orderSchema = z.object({
  postalCode: z.string().min(8, 'CEP deve ter 8 dígitos.'),
  address: z.string().min(3, 'Endereço incompleto.'),
  cardName: z.string().min(3, 'Nome no cartão incompleto.'),
  cardNumber: z.string().min(15, 'Número do cartão incompleto.'),
  expDate: z.string().min(4, 'Formato de data inválido.'),
  CVV: z.string().min(3, 'CVV deve ter 3 dígitos.'),
  paymentMethod: z.enum(['CARD', 'PIX']),
})

type OrderData = z.infer<typeof orderSchema>

export function OrderForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OrderData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      paymentMethod: 'CARD',
    },
  })

  const registerWithMask = useHookFormMask(register)

  async function handleCheckout(data: OrderData) {
    console.log(data)
  }

  return (
    <form
      onSubmit={handleSubmit(handleCheckout)}
      className="flex flex-col gap-4 col-span-2 p-4 bg-card rounded-lg border"
      autoComplete="on"
    >
      <div>
        <label className="text-sm font-medium" htmlFor="cep">
          CEP
        </label>
        <Input
          className="mt-2"
          id="cep"
          {...registerWithMask('postalCode', '99999-999', {
            autoUnmask: true,
          })}
          placeholder="Ex.: 35135-000"
          autoComplete="postal-code"
        />
        {errors.postalCode && (
          <span className="text-xs text-red-400">
            {errors.postalCode.message}
          </span>
        )}
      </div>
      <div>
        <label className="text-sm font-medium" htmlFor="address">
          Endereço de entrega
        </label>
        <Input
          className="mt-2"
          id="address"
          {...register('address')}
          placeholder="Rua João"
          autoComplete="street-address"
        />
        {errors.address && (
          <span className="text-xs text-red-400">{errors.address.message}</span>
        )}
      </div>
      <button
        data-selected={true}
        type="button"
        className="p-5 border bg-background rounded-lg data-[selected='true']:border-primary data-[selected='true']:text-primary max-w-fit"
      >
        <CreditCard />
      </button>
      <div>
        <label className="text-sm font-medium" htmlFor="cardName">
          Nome no cartão
        </label>
        <Input
          className="mt-2"
          id="cardName"
          {...register('cardName')}
          placeholder="João Silva"
          autoComplete="cc-name"
        />
        {errors.cardName && (
          <span className="text-xs text-red-400">
            {errors.cardName.message}
          </span>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div>
          <label className="text-sm font-medium" htmlFor="cardNumber">
            Número do cartão
          </label>
          <Input
            className="mt-2"
            id="cardNumber"
            {...registerWithMask(
              'cardNumber',
              // American Express  | Visa, Mastercard...
              ['9999 999999 99999', '9999 9999 9999 9999'],
              {
                autoUnmask: true,
              },
            )}
            placeholder="4242 4242 4242 4242"
            autoComplete="cc-number"
          />
          {errors.cardNumber && (
            <span className="text-xs text-red-400">
              {errors.cardNumber.message}
            </span>
          )}
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="expDate">
            Data de expiração
          </label>
          <Input
            className="mt-2"
            id="expDate"
            {...registerWithMask('expDate', '99/99', {
              autoUnmask: true,
            })}
            placeholder="00/00"
            autoComplete="cc-exp"
          />
          {errors.expDate && (
            <span className="text-xs text-red-400">
              {errors.expDate.message}
            </span>
          )}
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="CVV">
            CVV
          </label>
          <Input
            className="mt-2"
            id="CVV"
            //  Visa, Mastercard... | American Express
            {...registerWithMask('CVV', ['999', '9999'])}
            maxLength={3}
            placeholder="000"
            autoComplete="cc-csc"
          />
          {errors.CVV && (
            <span className="text-xs text-red-400">{errors.CVV.message}</span>
          )}
        </div>
      </div>
      <Button disabled={isSubmitting} type="submit" className="mt-4" size="lg">
        {isSubmitting && <Loader2 className="mr-2 animate-spin" />} Finalizar
        compra
      </Button>
    </form>
  )
}
