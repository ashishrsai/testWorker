export const arrayTransform = (arr) => {
  return arr.map((item) => ({
    name: item[0],
    city: item[1],
    skills: item[2].join(","),
    phoneNumber: item[3],
  }));
};

export const arrayTransformCompany = (arr) => {
  return arr.map((item) => ({
    companyName: item[0],
    companyPhoneNumber: item[1],
    companyContactName: item[2],
    companyCity: item[3],
  }));
};

export const transFormJobObject = (obj) => {
  return Object.keys(obj.jobs).map((item) => ({
    city: item,
    jobs: obj.jobs[item],
  }));
};
