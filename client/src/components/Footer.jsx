import '../styles/footer.css'
export default function () {
    const currentYear = new Date().getFullYear();

    return (
        <div className="footer">
            <p>Donut Panic! &copy; {currentYear}</p>
        </div>
    );
}