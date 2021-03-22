// map int representation of roles to the corresponding string
const roleMap = new Map();
roleMap.set(-1, "user");
roleMap.set(0, "admin")
roleMap.set(1, "teacher")
roleMap.set(2, "student")
const roleMapper = (role: number) => {
  return roleMap.get(role)
}

export default roleMapper