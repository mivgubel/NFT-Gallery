export const Pagination = ({ nextTokenId }) => {
  /* Fetch NFT data by collection

  tengo que llamar los siguientes 100 NFTs y enviarlos a nftcard to 
  */
  const fetchNFTsForCollection = async () => {
    var requestOptions = {
      method: 'GET',
    }
    const api_key = 'mKRL1jPvyMhgj7JIdp9wRkneUJMZSJpq'
    const baseURL = `https://eth-mainnet.alchemyapi.io/v2/${api_key}/getNFTsForCollection/`
    const fetchURL = `${baseURL}?contractAddress=${collection}&startToken=${nextTokenId}&withMetadata=${'true'}`
    const nfts = await fetch(fetchURL, requestOptions).then((data) =>
      data.json()
    )

    if (nfts) {
      console.log('NFTs in collection:', nfts)
      setNextToken(nfts.nextToken)
      setNFTs(nfts.nfts)
    }
  }

  console.log('next token: ', nextTokenId)

  return (
    <div className="flex flex-col items-center">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{' '}
        <span className="font-semibold text-gray-900 dark:text-white">100</span>{' '}
        NFTs per page
      </span>
      <div className="xs:mt-0 mt-2 inline-flex">
        <button className="inline-flex items-center rounded-l bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          <svg
            className="mr-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          Prev
        </button>
        <button className="inline-flex items-center rounded-r border-0 border-l border-gray-700 bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Next
          <svg
            className="ml-2 h-5 w-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  )
}
