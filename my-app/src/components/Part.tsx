import { CoursePart } from "../types.d";
import { assertNever } from "../utils/utils";

interface props {
  part: CoursePart;
}

const Part = ({ part }: props) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          <p>
            <i>{part.description}</i>
          </p>
        </div>
      );

    case "groupProject":
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </p>
          Project exercises {part.groupProjectCount}
        </div>
      );
    case "submission":
      return (
        <div>
          <p>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
            <p>
              <i>{part.description}</i>
            </p>
          </p>
          Submit to{" "}
          <a href={part.exerciseSubmissionLink}>
            {part.exerciseSubmissionLink}
          </a>
        </div>
      );
    case "special":
        return(
            <div>
                <p>
                    <strong>
                        {part.name} {part.exerciseCount}
                    </strong>
                </p>
                <p>
                    {part.description}
                </p>
                <p>
                    Required skills: {part.requirements.join(', ')}
                </p>
            </div>
        )
    default:
      return assertNever(part);
  }
};

export default Part;
