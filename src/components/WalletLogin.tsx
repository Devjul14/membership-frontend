"use client";

import { useAccount, useSignMessage, useDisconnect } from 'wagmi';
import { useEffect, useState } from 'react';
import { getNonce, loginWithSignature } from '@/utils/api';

export default function WalletLogin() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [nonce, setNonce] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { signMessageAsync } = useSignMessage();

  useEffect(() => {
    const fetchNonce = async () => {
      if (isConnected && address) {
        try {
          const res = await getNonce(address);
          setNonce(res.nonce);
        } catch (err) {
          setMessage('Failed to get nonce');
        }
      }
    };

    fetchNonce();
  }, [address, isConnected]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const signature = await signMessageAsync({ message: nonce });
      const res = await loginWithSignature(address!, signature);
      setMessage(`Logged in as ${res.name || address}`);
    } catch (err: any) {
      console.error(err);
      setMessage('Login failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected) return <p>Please connect wallet first</p>;

  return (
    <div className="space-y-4">
      <p>Wallet: {address}</p>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleLogin}
        disabled={loading || !nonce}
      >
        {loading ? 'Logging in...' : 'Sign & Login'}
      </button>
      <button
        className="bg-gray-300 text-black px-4 py-2 rounded"
        onClick={() => disconnect()}
      >
        Disconnect
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
