# 🕵️ Crime Investigation Management System

A robust and efficient system designed to streamline and manage crime investigation processes for law enforcement agencies in United States (US). This project aims to centralize criminal records, case details, and investigation workflows, facilitating better coordination and faster resolution of cases.

---

## 🌟 Features

- **User Roles:** Differentiated access for various users, such as patrol officers, review officers, investigators, chief officers, forensic specialists, financial analysts and potentially public users for complaint lodging.
- **Case Management:**
  - Record and track new cases, including incident details, victims, and involved parties.
  - Update case statuses (e.g., new, processing, pending, done).
  - Assign cases to specific investigators or departments.
- **Criminal Records:**
  - Maintain a comprehensive database of criminals, including their profiles, past activities, and associations.
  - Search and retrieve criminal records efficiently.
- **Evidence Management:**
  - Store and organize digital evidence (e.g., images, documents, reports) related to cases.
  - Maintain the chain of custody for evidence.
- **Physical Evidences Management:**
  _ **Unique Identification:** Each physical evidence item receives a unique `identification_code`.
  _ **Detailed Collection Information:** Record precise details about the evidence's collection, including:
  _ `scene_location`: Where the evidence was found.
  _ `collected_time`: The exact time of collection.
  _ `scene_description`: A narrative of the scene and context of collection.
  _ `initial_condition`: The state of the evidence when initially found.
  _ `preservation_measures`: Actions taken to preserve the evidence.
  _ **Chain of Custody Tracking:** Link evidence to the `collector_username` (the officer who collected it) and the `case_id` it belongs to, ensuring a clear chain of custody.
  _ **Soft Deletion:** Physical evidence records can be marked as `is_deleted` for data retention and auditing purposes.
  _ **Automated Timestamps:** `created_at` and `updated_at` timestamps are automatically managed.
- **Report Management:**
  - **Comprehensive Report Submission:** Users can submit detailed incident reports including:
    - **Crime Type:** Categorize reports by `against-persons`, `against-property`, `white-collar`, `cyber-crime`, `drug-related`, or `public-order`.
    - **Severity:** Mark reports as `urgent` or `not-urgent`.
    - **Time and Location:** Record the exact time and address of occurrence, along with the `case_location`.
    - **Detailed Description:** Provide a narrative of the incident.
    - **Reporter Information:** Capture reporter's full name, email, and phone number.
    - **Suspect Details:** Optionally include suspect's full name, physical description, contact information, and means of transport.
    - **Relation to Incident:** Specify if the reporter is a `victim`, `witness`, `offender`, or `anonymous`.
  - **Report Lifecycle:** Manage reports through distinct stages:
    - `PENDING`: Newly submitted reports awaiting review.
    - `APPROVED`: Reports accepted and potentially linked to a case.
    - `REJECTED`: Reports that are not processed further.
  - **Officer Approval:** Track the `officer_approve_id` for reports that have been approved or rejected by a specific officer.
  - **Automated Timestamps:** `reported_at`, `created_at`, and `updated_at` timestamps are automatically managed.
  - **Soft Deletion:** Reports can be marked as `is_deleted` instead of being permanently removed, allowing for data retention.
  - **Integration with Cases, Parties, and Evidences:** Reports are directly linked to `Case` entities upon approval, and can have multiple `Party` and `Evidence` entries associated with them.
- **Search Functionality:** Efficiently search for reports, physical evidences, cases, criminals, and other relevant information.
- **Secure Data Handling:** Ensure the confidentiality and integrity of sensitive crime data.

---

## 🛠️ Technologies Used

Based on common implementations of similar systems, this project likely utilizes a combination of the following technologies:

- **Frontend:**
  - ReactJS, React Query, Redux
- **Backend:**
  - NestJS
- **Database:**
  - MySQL

---

## 🚀 Setup and Installation

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/ngockim109/crime_investigation_management_system.git
    ```
2.  **Navigate to the Project Directory:**
    ```bash
    cd crime_investigation_management_system
    ```
3.  **Start Apache and MySQL:**
    - Open MySQL services.
4.  **Create Database:**
    - Create a new database. A common name for such a system might be `crime_db` or `crime_management_system`.
5.  **Configure Database Connection:**
    - Create .env following .env.example.
    - Update the database connection details (database name, username, password) to match your local setup.
6.  **Access the Application:**
    - Go to backend folder (cd be) and run: npm run start:dev.
    - Go to frontend folder (cd fe) and run: npm run dev.

---

## 💡 Usage

Once the system is set up, you can:

- **Admin Panel:** Log in as an administrator to manage user accounts, police stations/departments, and system configurations.
- **Public Portal:** Users can submit online complaints and track their status.
