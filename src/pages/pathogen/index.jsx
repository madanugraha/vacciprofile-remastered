import React, { useEffect, useState } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { toast, Bounce } from 'react-toastify'
import { Container } from '@/components/Container'
import { FormattedDate } from '@/components/FormattedDate'
import { pathogensData } from '@/data/pathogens'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@/icons/arrow-back';
import { getVaccinesByPathogenId } from '@/utils/vaccine';
import { getManufactureDetailByManufactureIds } from '@/utils/manufacture';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  height: '70%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 6,
  borderRadius: 4
};



function PlayPauseIcon({ playing, ...props }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 10 10" fill="none" {...props}>
      {playing ? (
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.496 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H2.68a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H1.496Zm5.82 0a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5H8.5a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5H7.316Z"
        />
      ) : (
        <path d="M8.25 4.567a.5.5 0 0 1 0 .866l-7.5 4.33A.5.5 0 0 1 0 9.33V.67A.5.5 0 0 1 .75.237l7.5 4.33Z" />
      )}
    </svg>
  )
}

function PathogensEntry({ pathogen }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [activeMenu, setActiveMenu] = useState('main');
  const [selectedVaccine, setSelectedVaccine] = useState({
    vaccineId: 0,
    name: ""
  });
  const [selectedPathogen, setSelectedPathogen] = useState({
    id: "",
    name: ""
  });
  const [selectedCompareVaccine, setSelectedCompareVaccine] = useState([]);


  // handlers
  const handleSelectedVaccineToCompare = (vaccineId) => {
    if (selectedCompareVaccine.length > 0) {
      const selectedVaccine = selectedCompareVaccine.map((vac) => {
        if (vac.vaccineId === vaccineId) {
          return {
            ...vac,
            selected: vac.selected ? false : true
          }
        } else {
          return {
            ...vac
          }
        }
      })
      setSelectedCompareVaccine(selectedVaccine);
    }
  }
  useEffect(() => {
    const vaccines = getVaccinesByPathogenId(selectedPathogen.id);
    const filter = vaccines.filter((vac) => vac.vaccineId !== selectedVaccine.vaccineId);
    if (filter.length > 0) {
      const f = filter.map((vac) => {
        return {
          ...vac,
          selected: false
        }
      })
      setSelectedCompareVaccine(f)
    };
  }, [selectedPathogen, selectedVaccine])

  const selectedCompareCount = selectedCompareVaccine.length > 0 && selectedCompareVaccine.filter((vac) => vac.selected).length;

  return (
    <>
      <article
        aria-labelledby={`pathogen-${pathogen.pathogenId}-title`}
        className="py-10 sm:py-12"
      >
        <Container>
          <div className="flex flex-col items-start">
            <h2
              id={`pathogen-${pathogen.pathogenId}-title`}
              className="mt-2 text-lg font-bold text-slate-900"
            >
              <Link href={`/pathogen/${pathogen.pathogenId}`}>{pathogen.name}</Link>
            </h2>
            {/* <FormattedDate
              date={new Date()}
              className="order-first font-mono text-sm leading-7 text-slate-500"
            /> */}
            <p className="mt-1 text-base leading-7 text-slate-700">
              {pathogen.description}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  toast('⚠️  feature unavailable', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                  });
                }}
                className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
                aria-label={`${false ? 'Pause' : 'Play'} episode ${pathogen.name
                  }}`}
              >
                <PlayPauseIcon
                  playing={false}
                  className="h-2.5 w-2.5 fill-current"
                />
                <span className="ml-3" aria-hidden="true">
                  Listen
                </span>
              </button>
              <span
                aria-hidden="true"
                className="text-sm font-bold text-slate-400"
              >
                /
              </span>
              <button
                onClick={() => {
                  setSelectedPathogen({
                    id: pathogen.pathogenId,
                    name: pathogen.name
                  })
                  setOpen(true);
                }}
                // href={`/${pathogen.name}`}
                className="flex items-center text-sm font-bold leading-6 text-pink-500 hover:text-pink-700 active:text-pink-900"
              >
                Show & Compare Vaccines
              </button>
            </div>
          </div>
        </Container>
      </article>
      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
          {activeMenu === 'main' && (
            <>
              <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
                Linked Vaccines
              </Typography>
              <table style={{
                width: '100%',
                marginTop: 20
              }} className='border-separate border-spacing-y-4'>
                <thead>
                  <tr>
                    <th className='text-left'>Name</th>
                    <th className='text-left'>Manufacture</th>
                    <th className='text-left'>Type</th>
                    <th className='text-left'>Link</th>
                    <th className='text-left'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getVaccinesByPathogenId(selectedPathogen.id).length > 0 ? getVaccinesByPathogenId(selectedPathogen.id).map((vaccine) => {
                    return (
                      <tr key={`${selectedPathogen.id}-${vaccine.name}`}>
                        <th className='text-left'>{vaccine.name}</th>
                        <th className='text-left'>{getManufactureDetailByManufactureIds(vaccine.manufacturers).map((manufacture) => manufacture.name).join(', ')}</th>
                        <th className='text-left'>{vaccine.vaccineType || "Unknown"}</th>
                        <th className='text-left'>
                          <a href='https://www.pfizer.com/products/product-detail/abrysvotm' className='text-blue-400' rel="noreferrer" target='_blank'>Open</a>
                        </th>
                        <th className='text-center'>
                          <button onClick={() => {
                            setSelectedVaccine({
                              vaccineId: vaccine.vaccineId,
                              name: vaccine.name
                            })
                            setActiveMenu('compare');
                          }} className='py-2 px-4 w-full bg-primary rounded-lg flex flex-col justify-center items-center cursor-pointer'>
                            <span className='text-white text-center'>Compare</span>
                          </button>
                        </th>
                      </tr>
                    )
                  }) : <tr>
                    <td colSpan={5} className='text-center'>- no vaccines data found -</td></tr>}
                </tbody>
              </table>
            </>
          )}
          {activeMenu === "compare" && (
            <div className='h-full w-full'>
              <div className='p-2 cursor-pointer' onClick={() => setActiveMenu('main')}>
                <ArrowBackIcon width={20} height={20} />
              </div>
              <div className='mt-4 px-2 w-full h-full'>
                <div className='flex flex-col'>
                  <span>Compare {selectedVaccine.name} with below vaccines</span>
                  <span>{selectedCompareCount ? selectedCompareCount : 0} Selected</span>
                </div>
                <table style={{
                  width: '100%',
                  marginTop: 20,
                }} className='border-separate border-spacing-y-4 w-full'>
                  <thead className='w-full'>
                    <tr>
                      <th className='text-left'>Name</th>
                      <th className='text-left'>Manufacture</th>
                      <th className='text-left'>Type</th>
                      <th className='text-left'>Comparable</th>
                      <th className='text-left'>Last Updated</th>
                      <th className='text-left'>Action</th>
                    </tr>
                  </thead>
                  <tbody className='w-full'>
                    {selectedCompareVaccine.length > 0 ? selectedCompareVaccine.map((vaccine) => {
                      return (
                        <tr className='w-full' key={`${selectedPathogen.id}-compare-${vaccine.name}`}>
                          <th className='text-left'>{vaccine.name}</th>
                          <th className='text-left'>{getManufactureDetailByManufactureIds(vaccine.manufacturers).map((manufacture) => manufacture.name).join(', ')}</th>
                          <th className='text-left'>{vaccine.vaccineType || "Unknown"}</th>
                          <th className='text-left'>Yes</th>
                          <th className='text-left'>{vaccine.lastUpdated ? vaccine.lastUpdated : 'Unknown'}</th>
                          <th className='text-center w-[150px]'>
                            <button onClick={() => {
                              handleSelectedVaccineToCompare(vaccine.vaccineId)
                            }} className={`py-2 w-[150px] ${vaccine.selected ? 'bg-primary' : 'bg-blue-500'} rounded-lg flex flex-col justify-center items-center cursor-pointer`}>
                              <span className='text-white text-center'>{vaccine.selected ? 'Selected' : 'Select'}</span>
                            </button>
                          </th>
                        </tr>
                      )
                    }) : <tr>
                      <td colSpan={4} className='text-center'>- no vaccines data found -</td></tr>}
                  </tbody>
                </table>
                <div className='flex flex-col align-bottom h-[60%] items-center justify-end w-full'>
                  <button onClick={() => {
                    if (selectedCompareCount <= 0) {
                      toast.info('Please select vaccines to compare.');
                      return;
                    }
                    setActiveMenu('compare-result')
                  }} className='py-3 px-12 bg-primary rounded-lg text-white font-semibold text-lg'>SUBMIT</button>
                </div>
              </div>
            </div>
          )}
          {activeMenu === 'compare-result' && (
            <div className='w-full h-full flex flex-col'>
              <div className='p-2 cursor-pointer' onClick={() => setActiveMenu('compare')}>
                <ArrowBackIcon width={20} height={20} />
              </div>
              <div className='flex flex-col mt-4 px-2 w-full h-full'>
                <span>Comparison Result Between</span>
                <span>{selectedVaccine.name} with: {selectedCompareVaccine.filter((vac) => vac.selected).map(vac => vac.name).join(', ')}</span>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </>
  )
}


export default function PathogenList({ pathogens }) {
  return (
    <>
      <Head>
        <title>
          VacciProfile by Global Health Press
        </title>
        <meta
          name="description"
          content="Convrsations with the most tragically misunderstood people of our time."
        />
      </Head>
      <div className="pb-12 pt-16 sm:pb-4 lg:pt-12">
        <Container>
          <h1 className="text-2xl font-bold leading-7 text-slate-900">
            Pathogens
          </h1>
        </Container>
        <div className="divide-y divide-slate-100 sm:mt-4 lg:mt-8 lg:border-t lg:border-slate-100">
          {pathogens.map((pathogen) => {
            return (
              <PathogensEntry key={pathogen.pathogenId} pathogen={pathogen} />
            )
          })}
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      pathogens: pathogensData
    }
  }
}