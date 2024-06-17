const Track=()=>{
    return(
        <div className="text-center m-4">
            <h1 className="text-3xl font-bold">Track the Product</h1>
            <h2 className="text-xl font-normal m-3">Scan the qr or enter id</h2>
            <div className="flex justify-center m-5">
               <label className="font-Normal m-4 text-xl w-40">Product Id</label> 
               <input type="text" className="border border-gray-400 rounded-md px-3 py-2 w-2/4"></input>
               </div>
               <div className="">
                <h2 className="text-xl font-medium m-3 underline">Product Details</h2>
               </div>
               <div>
                <p className="font-normal">Product ID</p>
                <p>Current status</p>
               </div>

        </div>
    )
}
export default Track;