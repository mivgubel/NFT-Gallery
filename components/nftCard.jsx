export const NFTCard = ({ nft }) => {
  // COPY TO CLIPBOARD
  function copy() {
    navigator.clipboard
      .writeText(nft.contract.address)
      .then(console.log('copiada address: ', nft.contract.address))
  }

  return (
    <div className="flex w-1/4 flex-col ">
      <div className="rounded-md">
        <img
          className="h-128 w-full rounded-t-md object-cover"
          src={nft.media[0].gateway}
        ></img>
      </div>
      <div className="y-gap-2 h-110 flex flex-col rounded-b-md bg-slate-100 px-2 py-3 ">
        <div className="">
          <h2 className="text-xl text-gray-800">{nft.title}</h2>
          <p className="text-gray-600">
            Id: {nft.id.tokenId.substr(nft.id.tokenId.length - 4)}
          </p>
          <button
            type="button"
            className="bg-gray float-right mr-1 mb-1 rounded-lg border border-gray-200"
            onClick={() => {
              copy()
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
          </button>

          <p className="text-gray-600">{`${nft.contract.address.substr(
            0,
            4
          )}...${nft.contract.address.substr(
            nft.contract.address.length - 4
          )}`}</p>
        </div>

        <div className="mt-2 flex-grow">
          <p className="text-gray-600">{nft.description?.substr(0, 150)}</p>
        </div>
      </div>
    </div>
  )
}
// 0x34d85c9cdeb23fa97cb08333b511ac86e1c4e258 // okay bears: 0x4becbdf97747413a18c5a2a53321d09198d3a100
