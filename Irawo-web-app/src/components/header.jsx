import { useState } from "react";
import moon from "../assets/moon.svg";
import dropdown from "../assets/dropdown.svg";
import notifications from "../assets/notifications.svg";
import "../styles/header.css";

function Header() {

  const [isDropdown, setIsDropdown] = useState({
    categories: false,
    roles: false,
    scenario: {
      scenarioBoolean: false,
      scenarioArray: [],
    },
  });
  const categories = {
    "Social Event": [
      "introducing yourself",
      "small talk",
      "networking",
      "first date",
      "Group gathering",
      "casual party",
      "formal reception",
    ],
    Workplace: [
      "Team Collaboration",
      "brainstorming session",
      "client meeting",
      "performance review",
      "Handling Conflict",
      "work lunch",
      "casual office interaction",
    ],
    Relationships: [
      "Expressing Feelings",
      "Resolving Disagreements",
      "Quality Time Together",
      "celebrating a milestone",
      "difficult conversation",
      "romantic evening",
      "family gathering",
    ],
  };
  const roles = [
    "teacher",
    "lecturer, guidance councellor",
    "class mate",
    "course mate",
  ];
  const handleRolesDropdown = () => {
    setIsDropdown({ ...isDropdown, roles: !isDropdown.roles });
    // if(isDropdown.categories && isDropdown.scenario.scenarioBoolean){
    //     setIsDropdown({...isDropdown, roles : !isDropdown.roles})
    // }
  };
  const handleCategoriesDropdown = () => {
    setIsDropdown({ ...isDropdown, categories: !isDropdown.categories });
  };
  const toggleScenarios = () => {
    if (isDropdown.scenario.scenarioArray.length > 0) {
      console.log(true);
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
        scenarioArray: [...categories[item]],
      },
    });
  };

  return (
    <div className="header">
      <h1>Irawo</h1>
      <div className="dropdown-container">
        <div className="dropdown-btn">
          <button
            className="categories"
            onClick={() => {
              handleCategoriesDropdown();
            }}
          >
            categories
            <img src={dropdown} alt="" />
          </button>

          <button
            className="scenario no-b"
            onClick={() => {
              toggleScenarios();
            }}
          >
            scenario tag
            <img src={dropdown} alt="" />
          </button>

          <button
            className="roles no-b"
            onClick={() => {
              handleRolesDropdown();
            }}
          >
            roles
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
                <button key={scenario} onClick={() => toggleScenarios()}>
                  {scenario}
                </button>
              );
            })}
          </div>
        ) : null}
        {isDropdown.roles ? (
          <div
            className="dropdown-div"
            style={{ top: "100%", position: "absolute" }}
          >
            {roles.map((role) => {
              return <button key={role}> {role} </button>;
            })}
          </div>
        ) : null}
      </div>
      <div className="icons">
        <button>
          <img src={moon} alt="" />
        </button>
        <button>
          <img src={notifications} alt="" />
        </button>
      </div>
    </div>
  );
}
export default Header;
