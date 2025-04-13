export interface Tweet {
    id: number,
    title: string,
    content: string,
    likes: number,
    createdAt: Date,
    lastModifiedAt : Date,
    writer: User
}

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    userName: string,
    email: string,
    password: string
}
