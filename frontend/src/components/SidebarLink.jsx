function SidebarLink({ label, view, onClick }) {
  return (
    <button
      data-view={view}
      onClick={onClick}
      className="w-full text-left px-3 py-2 rounded hover:bg-blue-100 text-gray-700"
    >
      {label}
    </button>
  );
}

export default SidebarLink;
