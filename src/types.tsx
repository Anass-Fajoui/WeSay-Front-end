export default interface Tweet {
    id: number,
    title: string,
    content: string,
    likes: number,
    createdAt: Date,
    lastModifiedAt : Date
}