

const FaqPost = ({items}) => {
    return (
        <>
            <main className="container faq">
                <div className="bg-body-tertiary p-5 rounded">
                    <h1>Older Post</h1>
                    <h3 className="lead">{items.post}</h3>
                </div>
            </main>
        </>
    )
}

export default FaqPost;