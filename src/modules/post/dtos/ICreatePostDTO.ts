type PostContent = {
  content: string;
};

export default interface ICreatePostDTO {
  data: PostContent;
  userId: string;
}
