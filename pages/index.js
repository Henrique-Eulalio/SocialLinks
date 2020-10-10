import React from 'react';
import Prismic from 'prismic-javascript';
import Head from 'next/head';

const Index  = ({ data }) => {
    return (
        <div className='w-1/2 mx-auto text-center'>
            <Head>
                <title>{data.pagetitle}</title>
            </Head>
            <h1 className='font-bold text-4xl p-8'>{data.title}</h1>
              { data.body.map(item =>  {
                  if (item.slice_type === 'imagem'){
                    //return <pre>{JSON.stringify(item, null, 2)}</pre>;
                    return <img src={item.primary.imagem.url} className='mx-auto rounded-full'></img>
                  }
                  if (item.slice_type === 'secao'){
                    return <h2 className='font-bold text-2xl p-4'>{item.primary.nome}</h2>;
                    //return <pre>{JSON.stringify(item)}</pre>;    
                  }
                  if (item.slice_type === 'link'){
                    return(
                        <div>
                            <a href={item.primary.link.url} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded m-1 inline-block'>{item.primary.texto_do_botao}</a>
                        </div>
                    );
                  } else{
                      return null;
                  }
                })}
            <div className='py-4'>
                Projeto criado durante o evento Dev10k do <a href="https://devpleno.com">DevPleno</a><br />
                Código fonte disponível em: 
            </div>
        </div>
    );
}

export async function getServerSideProps(){ //faz com que a página seja renderizada todas as vezes no servidor
    console.log('server');
    const client = Prismic.client('https://henriqueeulalio.cdn.prismic.io/api/v2');
    const centralLinks = await client.getSingle('centrallinks');
    console.log(centralLinks);
    return { props: {
            data: centralLinks.data,
        }
    }
}

export default Index;