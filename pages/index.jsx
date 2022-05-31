import { useState, useEffect } from 'react'
import { NFTCard } from '../components/nftCard.jsx'
import { Pagination } from '../components/Pagination.jsx'

const Home = () => {
  const [wallet, setWalletAddress] = useState('')
  const [collection, setCollectionAddress] = useState('')
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection] = useState(false)
  const [nextToken, setNextToken] = useState([{}])
  // previous token for render previous boton

  // Consultando los NFTs de la API de alchemy
  const fetchNFTs = async () => {
    let nfts
    console.log('Fetching NFts')
    const api_key = 'mKRL1jPvyMhgj7JIdp9wRkneUJMZSJpq'
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTs/`

    var requestOptions = {
      method: 'GET',
    }

    if (!collection.length) {
      const fetchURL = `${baseURL}?owner=${wallet}`
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    } else {
      console.log('fetching nfts for collection owned by address')
      const fetchURL = `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json())
    }

    if (nfts) {
      console.log('nfts:', nfts)
      setNFTs(nfts.ownedNfts)
    }
  }

  function addNextTokenId(prevId, nextId) {
    const updateNextTokenId = [
      ...nextToken,
      {
        previousTokenId: prevId,
        nextTokenId: nextId,
      },
    ]
    setNextToken(updateNextTokenId)
  }

  // Fetch NFT data by collection
  const fetchNFTsForCollection = async (startTokenObj = {}, btnPage = true) => {
    let previosPage = ''
    let fetchURL = ''
    if (collection.length) {
      var requestOptions = {
        method: 'GET',
      }

      const api_key = process.env.NEXT_PUBLIC_API_KEY
      const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`

      if (
        startTokenObj.hasOwnProperty('nextTokenId') &&
        startTokenObj.hasOwnProperty('previousTokenId')
      ) {
        if (btnPage) {
          fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=true&startToken=${startTokenObj.nextTokenId}`
        } else {
          fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=true&startToken=${startTokenObj.previousTokenId}`
          console.log('fetcj...')
        }
      } else {
        fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=true`
      }

      const nfts = await fetch(fetchURL, requestOptions).then((data) =>
        data.json()
      )

      if (nfts) {
        console.log('NFTs in collection:', nfts)
        // no estoy registrando correctamente el arreglo de objetos

        if (startTokenObj.hasOwnProperty('previousTokenId')) {
          if (btnPage) {
            previosPage = startTokenObj.nextTokenId
            setNextToken({
              previousTokenId: previosPage,
              nextTokenId: nfts.nextToken,
            })
          } else {
            setNextToken(startTokenObj)
            console.log('back')
          }
        } else {
          setNextToken({
            previousTokenId: previosPage,
            nextTokenId: nfts.nextToken,
          })
        }
        console.log('back tok:', nextToken)
        setNFTs(nfts.nfts)
      }
    }
  }

  // Return that create the web page
  return (
    <div className="flex flex-col items-center justify-center gap-y-3 py-8">
      <div className="flex w-full flex-col items-center justify-center gap-y-2">
        <input
          disabled={fetchForCollection}
          onChange={(e) => {
            setWalletAddress(e.target.value)
          }}
          value={wallet}
          type={'text'}
          placeholder="Add your wallet address"
          className="w-1/3 rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400"
        ></input>
        <input
          disabled={!fetchForCollection}
          onChange={(e) => {
            setCollectionAddress(e.target.value)
          }}
          value={collection}
          type={'text'}
          placeholder="Add the collection address"
          className="w-1/3 rounded-md border border-slate-300 bg-white px-3 py-2 placeholder-slate-400"
        ></input>
        <label className="text-gray-600 ">
          <input
            type={'checkbox'}
            onChange={(e) => {
              setFetchForCollection(e.target.checked)
            }}
            className="mr-2"
          ></input>
          Fetch for collection
        </label>
        {/* Hacemos que el boton llame a la funcion correcta en el evento: onclick dependiendo del checkbox */}
        <button
          className={
            'mt-3 w-1/5 rounded-md bg-green-800 px-4 py-2 text-white disabled:bg-slate-500'
          }
          onClick={() => {
            if (fetchForCollection) {
              fetchNFTsForCollection(nextToken)
            } else fetchNFTs()
          }}
        >
          Let's go!{' '}
        </button>
      </div>

      {NFTs.length > 0 && (
        <Pagination
          nextToken={nextToken}
          fetchNFTsForCollection={fetchNFTsForCollection}
        ></Pagination>
      )}
      <div className="mt-4 flex w-5/6 flex-wrap justify-center gap-y-12 gap-x-2">
        {NFTs.length > 0 &&
          NFTs.map((nft) => {
            return <NFTCard nft={nft}></NFTCard>
          })}
      </div>

      {/* NFTs.length && <Pagination nextTokenId={nextTokenId}></Pagination> */}
    </div>
  )
}

export default Home
