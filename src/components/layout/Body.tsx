const Body = () => {
  return (
    <>
        <main className="w-full h-screen font-poppins flex flex-col items-center bg-tb text-white">
            {/* choices section*/}
            <section className="border-yellow-500 border-2">
                <h1>Test Your Limit</h1>

            </section>

            {/* typing section */}
            <section className="border-green-500 border-2">
                Type here
            </section>
            
            {/* result section */}
            <section className="border-purple-500 border-2">
                Results
            </section>
        </main> 
    </>
  )
}

export default Body