import Concepts from "../components/fundamental_concepts/concepts"


export default function FundamentalConceptsPage() {
    return (
        <div className="animate-appear min-h-screen">
            <div className="flex flex-col justify-center items-center p-5 m-5">
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
                    Essential concepts to understand graph algorithms
                </h1>
            {/*<img src="../../public/p1.png" />*/}
                <Concepts />
            </div>
        </div>
    )
}