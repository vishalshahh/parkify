export const PaymentSuccessMessage = () => {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          ✓
        </div>
        <div>
          <div className="font-semibold text-green-800">
            Payment Processed Successfully!
          </div>
          <div className="text-sm text-green-700">
            Your booking has been confirmed. No need to re-enter your
            information.
          </div>
        </div>
      </div>
    </div>
  )
}
