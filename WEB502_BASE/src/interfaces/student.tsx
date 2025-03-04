interface IStudents {
    id: string,
    name: string,
    year: number,
    image: string,
    major: string
}
export default IStudents

export type InputStudent = Omit<IStudents, 'id'|'stock'>