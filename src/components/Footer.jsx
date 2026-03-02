export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-16">
      <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-medium">Mi Blog</span>. 
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}