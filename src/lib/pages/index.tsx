import React from 'react'
import Head from 'next/head'
import UnAuthenticatedLayout from '@/lib/components/layout/UnAuthenticatedLayout';


const IndexPage = () => (
  <div>
    <Head>
      <title>LEARNSPACE</title>
    </Head>
    <UnAuthenticatedLayout>
      <h1>Hello</h1>
    </UnAuthenticatedLayout>
  </div>
)

export default IndexPage;
