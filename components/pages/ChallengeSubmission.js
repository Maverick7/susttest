import React from "react";
import { Container, Nav, Spinner, Tab } from "react-bootstrap";
import styles from "../../styles/SubmissionTabs.module.css";
import IndividualForm from "../ui/SubmissionForm/IndividualForm";
import TeamForm from "../ui/SubmissionForm/TeamForm";

const ChallengeSubmission = () => {
  return (
    <main>
      <Container fluid className="mb-3" style={{ background: "" }}>
        <Tab.Container id="left-tabs-example" defaultActiveKey="individual">
          <Nav className={`submission_tabs`} variant="pills">
            <Nav.Item className="submission_tab_link">
              <Nav.Link eventKey="individual">Individual</Nav.Link>
            </Nav.Item>
            <Nav.Item className="submission_tab_link">
              <Nav.Link eventKey="team">Team</Nav.Link>
            </Nav.Item>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="individual">
              <IndividualForm />
            </Tab.Pane>
            <Tab.Pane eventKey="team">
              <TeamForm />
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Container>
    </main>
  );
};

export default ChallengeSubmission;
