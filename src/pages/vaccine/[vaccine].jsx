import Head from 'next/head'

import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import { vaccinesData } from '@/data/vaccines';
import { getManufactureDetailByManufactureIds } from '@/utils/manufacture';
import { getPathogenDetailById } from '@/utils/pathogen';
import { getLicenserDetailDetailByLicenserIds } from '@/utils/licenser';
import { parseDynamicPropsFromObject } from '@/utils/object';

export default function Vaccine({ vaccine }) {
    return (
        <>
            <Head>
                <title>{`${vaccine.name} - VacciProfile`}</title>
                <meta name="description" content={vaccine.description} />
            </Head>
            <article className="py-16 lg:py-36">
                <Container>
                    <header className="flex flex-col">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col">
                                <h1 className="mt-2 text-4xl font-bold text-slate-900">
                                    {vaccine.name}
                                </h1>
                                <FormattedDate
                                    date={new Date()}
                                    className="order-first font-mono text-sm leading-7 text-slate-500"
                                />
                            </div>
                        </div>
                        <p className="ml-24 mt-3 text-lg font-medium leading-8 text-slate-700">
                            {vaccine.description}
                        </p>
                    </header>
                    <hr className="my-12 border-gray-200" />
                    <div
                        className="prose prose-slate mt-14 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5"
                    >
                        <h2 id="manufacture">Manufacturers</h2>
                        <ul>
                            {getManufactureDetailByManufactureIds(vaccine.manufacturers) && getManufactureDetailByManufactureIds(vaccine.manufacturers).length > 0 && getManufactureDetailByManufactureIds(vaccine.manufacturers).map((manufacture) => {
                                return (
                                    <li key={`${vaccine.description}-${manufacture.name}`}><a href="#">{manufacture.name}</a>&nbsp;&nbsp;{manufacture.description}</li>
                                )
                            })}
                        </ul>
                        <h2 id="pathogen">Pathogens</h2>
                        <ul>
                            <li><a href="#">{getPathogenDetailById(vaccine.pathogenId)?.name}</a>&nbsp;&nbsp;{getPathogenDetailById(vaccine.pathogenId)?.description}</li>
                        </ul>
                        <h2 id="sponsors">Licensing Authorities</h2>
                        <ul>
                            {getLicenserDetailDetailByLicenserIds(vaccine.licensers) && getLicenserDetailDetailByLicenserIds(vaccine.licensers).length > 0 && getLicenserDetailDetailByLicenserIds(vaccine.licensers).map((licenser) => {
                                return (
                                    <li key={`${licenser.website}-${licenser.licenserId}`}><a href="https://www.fda.gov/media/168889/download?attachment">{licenser.acronym}</a> {licenser.fullName}</li>
                                )
                            })}
                        </ul>
                        <h2 id="links">Licensing Dates</h2>
                        <ul>
                            {
                                vaccine?.licensingDates && vaccine.licensingDates.map((licensing) => {
                                    return (
                                        <li key={`${licensing.type}-${licensing.date}`}><a href={licensing.source}>{licensing.name} - {licensing.type}</a> {licensing.date}</li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <hr className="my-12 border-gray-200" />
                    <div className='flex flex-col w-full'>
                        <h2 id="links">Approval Date: {vaccine.approvalDate}</h2>
                    </div>
                    <hr className="my-12 border-gray-200" />
                    <div className="flex w-full">
                        <div className="py-8 w-full">
                            <div>
                                <h2 className="text-2xl font-semibold leading-tight">General Information</h2>
                            </div>
                            <div className=" sm:px- py-4 overflow-x-auto w-full">
                                <div
                                    className="inline-block w-full shadow-md rounded-lg overflow-hidden"
                                >
                                    <table className="w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    Remark
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {vaccine.introduction['General Information'] && parseDynamicPropsFromObject(vaccine.introduction['General Information']).map((data) => {
                                                return data.value && data.value.length > 0 ? (
                                                    <>
                                                        <tr>
                                                            <td key={data.value[0]} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">{data.value[0] || "None"}</p>
                                                            </td>
                                                            <td key={data.value[1]} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">{data.value[1] || "None"}</p>
                                                            </td>
                                                        </tr>
                                                    </>
                                                ) : null
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-12 border-gray-200" />
                    <div className="flex w-full">
                        <div className="py-8 w-full">
                            <div>
                                <h2 className="text-2xl font-semibold leading-tight">Company Products, Pipeline</h2>
                            </div>
                            <div className=" sm:px- py-4 overflow-x-auto w-full">
                                <div
                                    className="inline-block w-full shadow-md rounded-lg overflow-hidden"
                                >
                                    <table className="w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    Remark
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {parseDynamicPropsFromObject(vaccine.introduction['Company products, pipeline']).map((data) => {
                                                return data.value && data.value.length > 0 ? (
                                                    <>
                                                        <tr>
                                                            <td key={data.value[0]} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">{data.value[0] || "None"}</p>
                                                            </td>
                                                            <td key={data.value[1]} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">{data.value[1] || "None"}</p>
                                                            </td>
                                                        </tr>
                                                    </>
                                                ) : null
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-12 border-gray-200" />
                    <div className="flex w-full">
                        <div className="py-8 w-full">
                            <div>
                                <h2 className="text-2xl font-semibold leading-tight">Product Profiles</h2>
                            </div>
                            <div className=" sm:px- py-4 overflow-x-auto w-full">
                                <div
                                    className="inline-block w-full shadow-md rounded-lg overflow-hidden"
                                >
                                    <table className="w-full leading-normal">
                                        <thead>
                                            <tr>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    Name
                                                </th>
                                                <th
                                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                                                >
                                                    Remark
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {parseDynamicPropsFromObject(vaccine.productProfiles[0]).map((data) => {
                                                return data.value && data.value.length > 0 ? (
                                                    <>
                                                        <tr>
                                                            <td key={data.value[0]} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                <p className="text-gray-900 whitespace-no-wrap">{data.value[0] || "None"}</p>
                                                            </td>
                                                            <td key={data.value[1]} className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                                {
                                                                    typeof data.value[1] !== "string" ? parseDynamicPropsFromObject(data.value[1]).map((childValue) => {

                                                                        return (
                                                                            <div className='flex flex-col' key={"zxcjakjsdjqwe"}>
                                                                                <p key={"zxc"} className="text-gray-900 whitespace-no-wrap">{childValue.value[0] || "None"}</p>
                                                                                <p key={"123assdkj"} className='text-gray-900 whitespace-no-wrap'>{childValue.value[1] || "None"}</p><br /><br />
                                                                            </div>
                                                                        )
                                                                    }) : <p key={"123assdkj"} className='text-gray-900 whitespace-no-wrap'>{data.value[1] || "None"}</p>
                                                                }
                                                            </td>
                                                        </tr>
                                                    </>
                                                ) : null
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="my-12 border-gray-200" />
                    <div
                        className="prose prose-slate mt-14 [&>h2:nth-of-type(3n)]:before:bg-violet-200 [&>h2:nth-of-type(3n+2)]:before:bg-indigo-200 [&>h2]:mt-12 [&>h2]:flex [&>h2]:items-center [&>h2]:font-mono [&>h2]:text-sm [&>h2]:font-medium [&>h2]:leading-7 [&>h2]:text-slate-900 [&>h2]:before:mr-3 [&>h2]:before:h-3 [&>h2]:before:w-1.5 [&>h2]:before:rounded-r-full [&>h2]:before:bg-cyan-200 [&>ul]:mt-6 [&>ul]:list-['\2013\20'] [&>ul]:pl-5"
                    >
                        <h2 id="manufacture">Other Source</h2>
                        <ul>
                            <li><a href={vaccine.link}>Source:</a>&nbsp;&nbsp;{vaccine.link}</li>
                            <li><a href="#">Last Updated</a>&nbsp;&nbsp;{vaccine.lastUpdated}</li>
                        </ul>
                    </div>
                </Container>
            </article>
        </>
    )
}

export async function getStaticProps({ params }) {
    let vaccine = vaccinesData.find(({ vaccineId }) => vaccineId.toString() === params.vaccine)
    if (!vaccine) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            vaccine,
        },
        revalidate: 10,
    }
}

export async function getStaticPaths() {
    let data = vaccinesData

    return {
        paths: data.map(({ vaccineId }) => ({
            params: {
                vaccine: vaccineId.toString(),
            },
        })),
        fallback: 'blocking',
    }
}
