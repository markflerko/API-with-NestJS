import CategoriesPermission from './categoriesPermission.enum';
import PostsPermission from './postsPermission.enum';

const Permission = {
  ...PostsPermission,
  ...CategoriesPermission,
};

type Permission = PostsPermission | CategoriesPermission;

export default Permission;
