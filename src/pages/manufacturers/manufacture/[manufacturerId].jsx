import Head from 'next/head'
import { Container } from '@/components/Container'
import { manufacturersData } from '@/data/manufacturers';
import { getVaccineById } from '@/utils/vaccine';

export default function ManufacturerDetail({ manufacturers }) {
    return (
        <>
            <Head>
                <title>{`${manufacturers.name} - VacciProfile`}</title>
                <meta name="description" content={manufacturers.description} />
            </Head>
            <article className="py-16 lg:py-36">
                <Container>
                    <header className="flex flex-col">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                                    {manufacturers.name}
                                </h1>
                            </div>
                        </div>
                        <p className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700">
                            {manufacturers.description}
                        </p>
                    </header>
                    <hr className="my-12 border-gray-200" />
                    <div
                        className="prose prose-slate mt-14 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5"
                    >
                        <h2 id="manufacture">Profile</h2>
                        <ul>
                            <li><a href="#">Founded</a>&nbsp;&nbsp;{manufacturers.details.founded}</li>
                            <li><a href="#">Headquarters</a>&nbsp;&nbsp;{manufacturers.details.headquarters}</li>
                            <li><a href="#">CEO</a>&nbsp;&nbsp;{manufacturers.details.ceo}</li>
                            <li><a href="#">Revenue</a>&nbsp;&nbsp;{manufacturers.details.revenue}</li>
                            <li><a href="#">Operating Income</a>&nbsp;&nbsp;{manufacturers.details.operatingIncome}</li>
                            <li><a href="#">Net Income</a>&nbsp;&nbsp;{manufacturers.details.netIncome}</li>
                            <li><a href="#">Total Assets</a>&nbsp;&nbsp;{manufacturers.details.totalAssets}</li>
                            <li><a href="#">Total Equity</a>&nbsp;&nbsp;{manufacturers.details.totalEquity}</li>
                            <li><a href="#">Number of Employees</a>&nbsp;&nbsp;{manufacturers.details.numberOfEmployees}</li>
                            <li><a href="#">Sources</a>&nbsp;&nbsp;
                                {manufacturers.details.sources.length > 0 && manufacturers.details.sources.map((x) => {
                                    return (
                                        <>
                                            <ul key={x.link}>Last Updated: {x.lastUpdated}</ul>
                                            <ul key={x.link}>Title: {x.title}</ul>
                                            <ul key={x.link}>Link: <a href="#">{x.link}</a></ul>
                                        </>

                                    )
                                })}
                            </li>
                        </ul>
                        <h2 id="pathogen">Linked Vaccines</h2>
                        <ul>
                            {manufacturers.vaccines && manufacturers.vaccines.length > 0 && manufacturers.vaccines.map((vac) => {
                                return (
                                    <li key={vac.vaccineId}><a href="#">{getVaccineById(vac.vaccineId)?.name}</a></li>
                                )
                            })}

                        </ul>
                        <h2 id="sponsors">Other</h2>
                        <ul>
                            <li><a href={manufacturers.link}>Reference Link</a> {manufacturers.link}</li>
                            <li><a href="#">Last Updated</a> {manufacturers.lastUpdated}</li>
                        </ul>
                    </div>
                </Container>
            </article>
        </>
    )
}

export async function getStaticProps({ params }) {
    let manufacturers = manufacturersData.find(({ manufacturerId }) => manufacturerId.toString() === params.manufacturerId)
    if (!manufacturers) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            manufacturers,
        },
        revalidate: 10,
    }
}

export async function getStaticPaths() {
    let data = manufacturersData

    return {
        paths: data.map(({ manufacturerId }) => ({
            params: {
                manufacturerId: manufacturerId.toString(),
            },
        })),
        fallback: 'blocking',
    }
}
