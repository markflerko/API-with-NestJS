const user = await get(UsersService).getByEmail('wanago.marcin@gmail.com');
await get(PostsService).createPost({ title: 'Lorem ipsum', paragraphs: ['Dolor sit amet'] }, user);