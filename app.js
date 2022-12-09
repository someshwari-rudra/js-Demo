const Name = document.querySelector("#name");
const email = document.querySelector("#email");
const mobile = document.querySelector("#Mobile");
const gender = document.getElementsByName("gender");
const hobbies = document.getElementsByName("hobbies");
const country = document.querySelector("#Country");
const state = document.querySelector("#state");
const city = document.querySelector("#city");
const error = document.querySelector("#error");
const submit = document.getElementById("saveData");
const showData = document.getElementById("showData");
const editDataBtn = document.getElementById("editDataBtn");
const cancelBtn = document.getElementById("cancelBtn");
const searchName = document.getElementById("searchName");
const ascendingData = document.getElementById("ascendingData");
const descendingData = document.getElementById("descendingData");

let nameFlag,
  emailFlag,
  mobileFlag,
  genderFlag,
  hobbiesFlag,
  countryFlag,
  stateFlag,
  cityFlag = false;

// load countries state and cities in selectbox
const countryData = [
  {
    id: 1,
    country: "India",
  },
  {
    id: 2,
    country: "Germany",
  },
];

const stateData = [
  {
    id: 1,
    country_id: 1,
    state: "Gujarat",
  },
  {
    id: 2,
    country_id: 1,
    state: "AndhraPradesh",
  },
  {
    id: 3,
    country_id: 2,
    state: "Hamburg",
  },
  {
    id: 4,
    country_id: 2,
    state: "Bremen",
  },
];

const cityData = [
  {
    id: 1,
    country_id: 1,
    state_id: 1,
    city: "Surat",
  },
  {
    id: 2,
    country_id: 1,
    state_id: 1,
    city: "Ahmedbad",
  },
  {
    id: 3,
    country_id: 1,
    state_id: 1,
    city: "Valsad",
  },
  {
    id: 4,
    country_id: 1,
    state_id: 2,
    city: "Visakhapatnam",
  },
  {
    id: 5,
    country_id: 1,
    state_id: 2,
    city: "Vijayawada",
  },
  {
    id: 6,
    country_id: 1,
    state_id: 2,
    city: "Guntur",
  },
  {
    id: 7,
    country_id: 2,
    state_id: 3,
    city: "Lüneburg",
  },
  {
    id: 8,
    country_id: 2,
    state_id: 3,
    city: "Travemuende",
  },
  {
    id: 9,
    country_id: 2,
    state_id: 4,
    city: "Altstadt",
  },
  {
    id: 10,
    country_id: 2,
    state_id: 4,
    city: "Arbergen",
  },
];

submit.addEventListener("click", (e) => {
  e.preventDefault();
  index = null;
  checkValidation(index);
});
Name.addEventListener("keyup", () => {
  NameValidation();
});

email.addEventListener("keyup", () => {
  EmailValidate();
});
mobile.addEventListener("keyup", () => {
  MobileNoValidation();
});
country.addEventListener("change", () => {
  CountryValidation();
});
state.addEventListener("change", () => {
  StateValidation();
});
city.addEventListener("change", () => {
  CityValidation();
});

//static array to store the form data
let formData = [];

class addFromDetails {
  constructor(name, email, mobile, gender, hobbies, country, state, city) {
    this.name = name;
    this.email = email;
    this.mobile = mobile;
    this.gender = gender;
    this.hobbies = hobbies;
    this.country = country;
    this.state = state;
    this.city = city;
  }
}
//initial table entries
const FirstData = new addFromDetails(
  "someshwari",
  "somyarudra9@gmail.com",
  "8488587458",
  "Female",
  "Reading",
  "India",
  "Gujarat",
  "Surat"
);
const secondData = new addFromDetails(
  "rudra",
  "rudra@gmail.com",
  "8896632144",
  "Female",
  "Sports",
  "India",
  "Gujarat",
  "Surat"
);

formData.push(FirstData);
formData.push(secondData);

function ShowTableData(fd) {
  let html = "";
  fd.forEach((ele, index) => {
    html += `<tr>
                    <td scope="row">${ele.name}</td>
                    <td>${ele.email}</td>
                    <td>${ele.mobile}</td>
                    <td>${ele.gender}</td>
                    <td>${ele.hobbies}</td>
                    <td>${ele.country}</td>
                    <td>${ele.state}</td>
                    <td>${ele.city}</td>
                    <td><button type="button" class="btn btn-warning" onclick="EditData(${index})" >Edit</button></td>
                    <td><button type="button" class="btn btn-danger" onclick="DeleteData(${index})">Delete</button></td>
                  </tr>`;
  });
  if (formData != null) {
    showData.innerHTML = html;
  } else {
    showData.innerHTML = "no data";
  }
}
ShowTableData(formData);

function DeleteData(id) {
  if (formData.length != null) {
    formData.splice(id, 1);
    ShowTableData(formData);
  }
}
//edit the data
function EditData(id) {

    resetFormValues(Name, email, mobile, gender, hobbies, country, state, city);
    for (let i = 0; i < hobbies.length; i++) {
        hobbies[i].checked = false;
    }

  submit.style.display = "none";
  editDataBtn.style.display = "block";
  cancelBtn.style.display = "block";
  const edit = formData[id];
  Name.value = edit.name;
  email.value = edit.email;
  mobile.value = edit.mobile;
  country.value = edit.country;

  const countryValue = edit.country;
  let stateobj = countryData.find((o) => o.country === countryValue);

  selectedState = stateData.filter((ele) => {
    return ele.country_id === stateobj.id;
  });

  selectedState.forEach((ele) => {
    return (state.options[state.options.length] = new Option(
      ele.state,
      ele.state
    ));
  });

  state.value = edit.state;
  const selectedValue = edit.state;
  let obj = stateData.find((o) => o.state === selectedValue);

  selectedCity = cityData.filter((ele) => {
    return ele.state_id === obj.id;
  });

  selectedCity.forEach((ele) => {
    return (city.options[city.options.length] = new Option(ele.city, ele.city));
  });

  city.value = edit.city;

  let genderValue = edit.gender;
  let hobbiesValue = edit.hobbies;

  for (let i = 0; i < gender.length; i++) {
    if (gender[i].value == genderValue) {
      gender[i].checked = true;
    }
  }

  for (let i = 0; i < hobbies.length; i++) {
    if (hobbies[i].value == hobbiesValue) {
      hobbies[i].checked = true;
    }
  }

  editDataBtn.addEventListener("click", (e) => {
    e.preventDefault();
    checkValidation(id);
    console.log(id);
    submit.style.display = "block";
    editDataBtn.style.display = "none";
    cancelBtn.style.display = "none";
  });
}

//adds and updates the data
function addData(index, newData) {
  if (index == null) {
    formData.push(newData);
  } else {
    formData[index] = newData;
  }
}

//cancel form from update
cancelBtn.addEventListener("click", () => {
  resetFormValues(Name, email, mobile, gender, hobbies, country, state, city);
  submit.style.display = "block";
  editDataBtn.style.display = "none";
  cancelBtn.style.display = "none";
});

//searchData when input Value Changes
searchName.addEventListener("keyup", () => {
  let keyword = searchName.value.toLowerCase();

  filteredData = formData.filter((ele) => {
    filter = ele.name.toLowerCase();
    return filter.indexOf(keyword) > -1;
  });

  ShowTableData(filteredData);
});

//SORT DATA BY ASCENDING
ascendingData.addEventListener("click", () => {
  formData.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  ShowTableData(formData);
});

//SORT DATA BY DESCENDING
descendingData.addEventListener("click", () => {
  formData.sort(function (a, b) {
    if (a.name > b.name) {
      return -1;
    }
    if (a.name < b.name) {
      return 1;
    }
    return 0;
  });
  ShowTableData(formData);
});

function genderValidation() {
  for (let i = 0; i < gender.length; i++) {
    gender[i].onclick = () => {
      RadioButtonValidation();
    };
  }
}
genderValidation();

function HobbiesValidation() {
  for (let i = 0; i < hobbies.length; i++) {
    hobbies[i].onclick = () => {
      CheckBoxValidation();
    };
  }
}
HobbiesValidation();

function EmailValidate() {
  const emailValue = email.value.trim();
  message1 = "please Enter Email.!";
  message2 = "please Enter Valid Email.!";
  const flag = checkinputValidate(emailValue,isEmail,emailFlag,email,message1,message2);
  return {
    EmailFlag: flag,
    EmailValue: emailValue,
  };
}

function NameValidation() {
  const nameValue = Name.value;
  message1 = "please Enter Name.!";
  message2 =
    "name length must be greater than 3 and less than 30 charcher... no number Allwoed.!";
  const flag = checkinputValidate(
    nameValue,
    isName,
    nameFlag,
    Name,
    message1,
    message2
  );
  return {
    NameFlag: flag,
    NameValue: nameValue,
  };
}

function MobileNoValidation() {
  const mobileValue = mobile.value.trim();
  message1 = "please Enter Mobile No.!";
  message2 = "mobile no must be 10 digits and no alplabets Allowed.!";
  const flag = checkinputValidate(
    mobileValue,
    isMobile,
    mobileFlag,
    mobile,
    message1,
    message2
  );
  return {
    MobileFlag: flag,
    MobileValue: mobileValue,
  };
}

function RadioButtonValidation() {
  let genderSelected = false;
  let GenderValue = "";
  let message = "Please Select Gender.!";
  const Rflag = RadioCheckboxValidation(
    gender,
    genderSelected,
    genderFlag,
    GenderValue,
    message
  );
  const { flag, value } = Rflag;
  return {
    RadioFlag: flag,
    RadioValue: value,
  };
}
function CheckBoxValidation() {
  let hobbiesSelected = false;
  let HobbiesValue = "";
  let message = "please Select Hobbies";
  const Cflag = RadioCheckboxValidation(
    hobbies,
    hobbiesSelected,
    hobbiesFlag,
    HobbiesValue,
    message
  );
  const { flag, value } = Cflag;
  return {
    CheckBoxFlag: flag,
    CheckboxValue: value,
  };
}

function CountryValidation() {
  const countryValue = country.value;
  if (countryValue == "") {
    setError(country, "Please select your country.!");
  } else {
    countryFlag = true;
    steSuccess(country);
  }
  return {
    CountryFlag: countryFlag,
    CountryValue: countryValue,
  };
}
function StateValidation() {
  const StateValue = state.value.trim();
  if (StateValue == "") {
    setError(state, "Please select your state.!");
  } else {
    stateFlag = true;
    steSuccess(state);
  }
  return {
    StateFlag: stateFlag,
    StateValue: StateValue,
  };
}

function CityValidation() {
  const CityValue = city.value.trim();
  if (CityValue == "") {
    setError(city, "Please select your City.!");
  } else {
    steSuccess(city);
    cityFlag = true;
  }
  return {
    CityFLAG: cityFlag,
    CityValue: CityValue,
  };
}

function checkinputValidate(
  inputvalue,
  regularExpression,
  flag,
  input,
  message1,
  message2
) {
  if (inputvalue === "") {
    setError(input, message1);
  } else if (!regularExpression(inputvalue)) {
    setError(input, message2);
  } else {
    flag = true;
    steSuccess(input);
  }
  return flag;
}

function RadioCheckboxValidation(
  input,
  inputSelected,
  flag,
  inputValue,
  message
) {
  for (let i = 0; i < input.length; i++) {
    if (input[i].checked == true) {
      inputSelected = true;
    }

    if (!inputSelected) {
      setError(input[i], message);
    } else {
      flag = true;
      for (let i = 0; i < input.length; i++) {
        steSuccess(input[i]);
      }
    }
    if (input[i].checked == true) {
      inputValue = input[i].value;
    }
  }
  return {
    flag: flag,
    value: inputValue,
  };
}

//checks validation of every field
function checkValidation(myIndex) {
  const Nflag = NameValidation();
  const { NameFlag, NameValue } = Nflag;
  const Eflag = EmailValidate();
  const { EmailFlag, EmailValue } = Eflag;

  const Mflag = MobileNoValidation();
  const { MobileFlag, MobileValue } = Mflag;

  const Cflag = CountryValidation();
  const { CountryFlag, CountryValue } = Cflag;

  const Sflag = StateValidation();
  const { StateFlag, StateValue } = Sflag;

  const CityFlag = CityValidation();
  const { CityFLAG, CityValue } = CityFlag;

  const Rflag = RadioButtonValidation();
  const { RadioFlag, RadioValue } = Rflag;

  const Checkflag = CheckBoxValidation();
  const { CheckBoxFlag, CheckboxValue } = Checkflag;

  if (
    NameFlag == true &&
    EmailFlag == true &&
    MobileFlag == true &&
    RadioFlag == true &&
    CheckBoxFlag == true &&
    CountryFlag == true &&
    StateFlag == true &&
    CityFLAG == true
  ) {
    let addFormData = new addFromDetails(
      NameValue,
      EmailValue,
      MobileValue,
      RadioValue,
      CheckboxValue,
      CountryValue,
      StateValue,
      CityValue
    );
    resetFormValues(Name, email, mobile, gender, hobbies, country, state, city);
    addData(myIndex, addFormData);
    ShowTableData(formData);
  }
}

// reset form values
function resetFormValues(
  Name,
  email,
  mobile,
  gender,
  hobbies,
  country,
  state,
  city
) {
  Name.value = "";
  email.value = "";
  mobile.value = "";
  for (let i = 0; i < gender.length; i++) {
    gender[i].checked = false;
  }
  for (let i = 0; i < hobbies.length; i++) {
    hobbies[i].checked = false;
  }
  country.value = "";
  (state.value = ""), (city.value = "");
}

function setError(input, message) {
  const form_control = input.parentElement;
  const small = form_control.querySelector("small");
  input.classList.add("error");
  // input.className = "form-control shadow-sm border-danger"
  small.innerHTML = message;
}
function steSuccess(input) {
  input.classList.add("success");
  const formControl = input.parentElement;
  const message = formControl.querySelector("small");
  message.innerHTML = "";
}

function isEmail(Email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(Email).toLowerCase());
}
function isMobile(mobile) {
  const re = /^[7-9][0-9]{9}$/;
  return re.test(Number(mobile));
}

function isName(name) {
  const re = /^[a-zA-Z ]{2,30}$/;
  return re.test(String(name).toLowerCase());
}

window.onload = function () {
  countryData.forEach((ele) => {
    return (country.options[country.options.length] = new Option(
      ele.country,
      ele.country
    ));
  });
};

country.onchange = () => {
  state.length = 1; //to empty the options if previously selected
  selectedCountry = country.options[country.selectedIndex].value;

  let obj = countryData.find((o) => o.country === selectedCountry);

  selectedState = stateData.filter((ele) => {
    return ele.country_id === obj.id;
  });

  selectedState.forEach((ele) => {
    return (state.options[state.options.length] = new Option(
      ele.state,
      ele.state
    ));
  });
};


state.onchange = () => {
  city.length = 1; //to empty the options if previously selected
  selectedState = state.options[state.selectedIndex].value;

  let obj = stateData.find((o) => o.state === selectedState);

  selectedCity = cityData.filter((ele) => {
    return ele.state_id === obj.id;
  });

  selectedCity.forEach((ele) => {
    return (city.options[city.options.length] = new Option(ele.city, ele.city));
  });
};
