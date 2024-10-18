import { AudioProvider } from '@/components/AudioProvider'
import { Layout } from '@/components/Layout'
import { ToastContainer, toast } from 'react-toastify';

import '@/styles/tailwind.css'
import 'focus-visible'
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {

  return (
    <AudioProvider>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </AudioProvider>
  )
}
