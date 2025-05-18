import { useNavigate } from "react-router";

export default function UserAllPosts() {
  const naviget = useNavigate();

  const openModal = () => {
    const modal = document.getElementById("my_modal_5");
    if (modal) {
      modal.showModal();
    }
  };

  return (
    <div>
      <ul className="list bg-base-100 rounded-box shadow-md mt-4">
        <li className="list-row">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
          </div>
          <div>
            <div>Dio Lupa</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              Remaining Reason
            </div>
          </div>
          <p className="list-col-wrap text-xs">
            "Remaining Reason" became an instant hit, praised for its haunting
          </p>

          <fieldset className="fieldset">
            <select defaultValue="Pick a browser" className="select">
              <option disabled={true}>Pick a Status</option>
              <option>Published</option>
              <option>Draft</option>
              <option>Reviews</option>
            </select>
          </fieldset>

          <button onClick={openModal} className="btn btn-neutral">
            Edite
          </button>
          <button onClick={() => naviget("/post")} className="btn btn-neutral">
            Details
          </button>
        </li>
      </ul>
    </div>
  );
}
