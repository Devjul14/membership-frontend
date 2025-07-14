import WalletConnect from '@/components/WalletConnect'
import WalletLogin  from '@/components/WalletLogin'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Membership Web3 Login</h1>
      <WalletConnect />
      <WalletLogin />
    </main>
  )
}
