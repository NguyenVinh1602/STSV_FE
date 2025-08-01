'use client';

import { useState } from 'react';
import Head from 'next/head';
import { Bot, User } from 'lucide-react';
import Header from '@/components/landing-page/Header';
import FeatureBlock from '@/components/landing-page/FeatureBlock';
import Modal from '@/components/landing-page/Modal';
import Hero from '@/components/landing-page/Hero';
import Footer from '@/components/landing-page/Footer';
import { useRouter } from 'next/navigation';
export default function App() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');

  const showModal = (title: string, message: string) => {
    setModalTitle(title);
    setModalMessage(message);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAuthClick = (type: 'login' | 'register') => {
    if (type === 'login') {
           router.push('/login');
    } else {
       router.push('/register');
    }
  };

  const handleFeatureClick = (feature: 'chatbot' | 'stranger-chat') => {
    if (feature === 'chatbot') {
      router.push('/bot');
    } else {
      showModal('Chat với người lạ', 'Chuyển hướng đến trang chat với người lạ.');
    }
  };

  return (
    <>
      <Head>
        <title>STSV - Chatbot & Chat với người lạ</title>
        <meta name="description" content="Chào mừng đến với STSV, nơi bạn có thể trò chuyện với AI hoặc chat ẩn danh với một người lạ." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Modal title={modalTitle} message={modalMessage} isOpen={isModalOpen} onClose={closeModal} />

      <div className="min-h-screen bg-neutral-900 text-white font-inter flex flex-col">
        <Header onLoginClick={() => handleAuthClick('login')} onRegisterClick={() => handleAuthClick('register')} />
        <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
          <Hero />
          <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
            <FeatureBlock
              title="Trò chuyện với Chatbot"
              description="Khám phá sức mạnh của trí tuệ nhân tạo. Đặt câu hỏi, tìm kiếm thông tin hoặc chỉ đơn giản là trò chuyện với một người bạn AI."
              icon={<Bot width={64} height={64} />}
              iconColor="text-indigo-400"
              borderColor="hover:border-indigo-500"
              onClick={() => handleFeatureClick('chatbot')}
            />
            <FeatureBlock
              title="Chat với người lạ"
              description="Kết nối ngẫu nhiên với một người nào đó trên thế giới. Chia sẻ suy nghĩ, câu chuyện hoặc chỉ là một lời chào ẩn danh."
              icon={<User width={64} height={64} />}
              iconColor="text-purple-400"
              borderColor="hover:border-purple-500"
              onClick={() => handleFeatureClick('stranger-chat')}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
