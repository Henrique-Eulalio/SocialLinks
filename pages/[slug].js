import React, { useEffect } from 'react';
import Prismic from 'prismic-javascript';
import { useRouter } from 'next/router';
import Head from 'next/head';

const RedirectTo = () => {
    const router = useRouter();
    useEffect(() => {
        setTimeout(() => {
            router.push('/');
        }, 2000);
    }, []);
    return (
        <div className='text-center mt-8'>
            <Head>
                <title>Página não encontrada</title>
            </Head>
            <h1 className='font-bold text-4xl'>URL não encontrada!</h1>
            <p>Estamos redirecionando você para a Central de Links</p>
        </div>
    );
}

export async function getServerSideProps({ params, res }){
    const client = Prismic.client('https://henriqueeulalio.cdn.prismic.io/api/v2');
    const link = await client.getByUID('shortlink', params.slug);
    if (link){
        res.statusCode = 301; // -> conteúdo movido permanentemente
        res.setHeader('Location', link.data.destino.url); // -> redireciona
        res.end(); // -> faz com que o servidor não mande mais nada para o navegador
        return;
    }
    return {
        props: {},
    };
}

export default RedirectTo;