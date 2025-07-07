import Access from "./protected-route/access";
import { ALL_PERMISSIONS } from "./protected-route/config-permission";

const PermissionPage = () => {
  return (
    <div>
      Permission page
      <Access permission={ALL_PERMISSIONS.PERMISSIONS.CREATE}
        hideChildren>
        <button>Create new permission</button>
      </Access>
    </div>
  )
}
export default PermissionPage;