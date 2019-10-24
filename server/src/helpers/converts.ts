export const convertToJson = (value: any) => {
    return JSON.parse(JSON.stringify(value[0]));
}