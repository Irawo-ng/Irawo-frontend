/* eslint-disable react/prop-types */
import { useState, useContext} from "react";
import dropdown from "../assets/dropdown.svg";
import { categories } from "./categories";
import { AppContext } from "./authcontext";

export function Categories({ toggleInput }) {
  const [isDropdown, setIsDropdown] = useState({
    categories: false,
    authenticateRoles: false,
    scenario: {
      scenarioBoolean: false,
      scenarioArray: [],
    },
    roles: {
      rolesBoolean: false,
      rolesArray: [],
    },
  });
  const { messageState, setMessageState } = useContext(AppContext);

  // const [messageState, setMessageState] = useState({
  //   categories: "",
  //   scenario: "",
  //   roles: "",
  // });

  const [buttonText, setButtonText] = useState({
    categoriesBtn: "Categories",
    scenariosBtn: "Scenario",
    rolesBtn: "Roles",
  });

  const rolesBtnFunction = (item) => {
    setIsDropdown({
      ...isDropdown,
      roles: {
        ...isDropdown.roles,
        rolesBoolean: !isDropdown.roles.rolesBoolean,
      },
    });

    toggleInput();

    setButtonText({
      ...buttonText,
      rolesBtn: item,
    });

    setMessageState({
      ...messageState,
      roles: item,
    });
  };

  const authenticateRolesToggle = (item) => {
    console.log(item);
    setIsDropdown((prevState) => ({
      ...prevState,
      authenticateRoles: prevState.authenticateRoles
        ? prevState.authenticateRoles
        : !prevState.authenticateRoles,
      scenario: {
        ...prevState.scenario,
        scenarioBoolean: !prevState.scenario.scenarioBoolean,
      },
    }));

    setButtonText({
      ...buttonText,
      scenariosBtn: item,
    });

    setMessageState({
      ...messageState,
      scenario: item,
    });
  };

  const handleRolesDropdown = () => {
    console.log(isDropdown.authenticateRoles);
    if (isDropdown.authenticateRoles) {
      setIsDropdown({
        ...isDropdown,
        roles: {
          ...isDropdown.roles,
          rolesBoolean: !isDropdown.roles.rolesBoolean,
        },
      });
    }
  };

  const handleCategoriesDropdown = () => {
    setIsDropdown({ ...isDropdown, categories: !isDropdown.categories });
  };

  const toggleScenarios = () => {
    if (isDropdown.scenario.scenarioArray.length > 0) {
      // console.log(true);
      setIsDropdown({
        ...isDropdown,
        scenario: {
          ...isDropdown.scenario,
          scenarioBoolean: !isDropdown.scenario.scenarioBoolean,
        },
      });
    }
  };

  const populateScenariosArray = (item) => {
    setIsDropdown({
      ...isDropdown,
      categories: !isDropdown.categories,
      scenario: {
        ...isDropdown.scenario,
        scenarioArray: [...categories[item]["scenario_tags"]],
      },
      roles: {
        ...isDropdown.roles,
        rolesArray: [...categories[item]["roles"]],
      },
    });

    setButtonText({
      ...buttonText,
      categoriesBtn: item,
    });

    setMessageState({
      ...messageState,
      categories: item,
    });
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-btn">
        <button
          className="categories"
          onClick={() => {
            handleCategoriesDropdown();
          }}
        >
          {buttonText.categoriesBtn}
          <img src={dropdown} alt="" />
        </button>

        <button
          className="scenario no-b"
          onClick={() => {
            toggleScenarios();
          }}
        >
          {buttonText.scenariosBtn}
          <img src={dropdown} alt="" />
        </button>

        <button
          className="roles no-b"
          onClick={() => {
            handleRolesDropdown();
          }}
        >
          {buttonText.rolesBtn}
          <img src={dropdown} alt="" />
        </button>
      </div>
      {isDropdown.categories ? (
        <div
          className="dropdown-div"
          style={{ top: "100%", position: "absolute" }}
        >
          {Object.keys(categories).map((items) => {
            return (
              <button
                key={items}
                onClick={() => {
                  populateScenariosArray(items);
                }}
              >
                {items}
              </button>
            );
          })}
        </div>
      ) : null}
      {isDropdown.scenario.scenarioBoolean &&
      isDropdown.scenario.scenarioArray.length > 0 ? (
        <div
          className="dropdown-div"
          style={{ top: "100%", position: "absolute" }}
        >
          {isDropdown.scenario.scenarioArray.map((scenario) => {
            return (
              <button
                key={scenario}
                onClick={() => authenticateRolesToggle(scenario)}
              >
                {scenario}
              </button>
            );
          })}
        </div>
      ) : null}
      {isDropdown.roles.rolesBoolean &&
      isDropdown.roles.rolesArray.length > 0 ? (
        <div
          className="dropdown-div"
          style={{ top: "100%", position: "absolute" }}
        >
          {isDropdown.roles.rolesArray.map((role) => {
            return (
              <button key={role} onClick={() => rolesBtnFunction(role)}>
                {" "}
                {role}{" "}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

//Name functions well
