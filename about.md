# Questionnaire summary page
## Specifications
Before starting therapy with Haleo, our users are filling out questionnaires and we would like to show a comprehensive summary to the therapist.
There are two questionnaires:
 - A screener filled multiple weeks before the therapy.
 - A therapy questionnaire filled the day the therapy start.

We would like to show a list of health risks a user has. Both questionnaires are detecting risks, some of them are only present in one questionnaire, others are present in both. The list should show all the risk, but without duplicates. For the risks that are in both questionnaires, take only the most recent answer.

For each risk, if it's positive use a dark blue background, otherwise use a white background.
To evaluate if a risk is positive, take the value of the answer and use the table below: 

| Risk     | Answer value        | Status   |
| ---      | -----               |---       |
| RLS      | highRisk            | Positive |
| RLS      | lowRisk             | Negative |
| SWSD     | highRisk            | Positive |
| SWSD     | lowRisk             | Negative |
| Caffeine | sometimes or always | Positive |
| Caffeine | never               | Negative |
| Alcohol  | sometimes or always | Positive |
| Alcohol  | never               | Negative |

Data sample to use:
```json
[
  {
    "completedAt": "2020-09-14T14:00:00+00:00",
    "label": "Screener",
    "questions": [
      {"id": 1, "label": "RLS Risk"},
      {"id": 3, "label": "Caffeine"},
      {"id": 4, "label": "Alcohol"}
    ],
    "answers": [
      {"questionId": 1, "value": "highRisk"},
      {"questionId": 3, "value": "always"},
      {"questionId": 4, "value": "sometimes"}
    ]
  },
  {
    "completedAt": "2020-09-30T08:00:00+00:00",
    "label": "Therapy questionnaire",
    "questions": [
      {"id": 2, "label": "SWSD Risk"},
      {"id": 3, "label": "Caffeine"},
      {"id": 4, "label": "Alcohol"}
    ],
    "answers": [
      {"questionId": 2, "value": "lowRisk"},
      {"questionId": 3, "value": "always"},
      {"questionId": 4, "value": "never"}
    ]
  }
]
```

The UI should look like: 
(It's only an example, it's not based on the data sample)
![Example](https://i.ibb.co/7y61yHB/Example.png)


## Assignment
- Using HTML, CSS and Javascript create the summary page. 
- You don't have to use any framework, but feel free to use what you are comfortable with.
- Your solution should work on Chrome. There no need to support other browsers.
- The code should be as much as possible self-explanatory, some comments can be used to explain complex parts. 
- For any additional information you want to provide, create a readme.md file. You will also have the opportunity to explain your work during the technical interview.
- Spend a maximum of 4 hours on this project. 
- You are evaluated on the quality of the work, not on how fast you did it.
- This is a 100% open book test - you can use any tool you want, search Google for solutions to common problems, etc...

## How to submit your solution
- Clone this snippet (`git clone https://gitlab.com/snippets/2191514.git`) and create a local branch.
- Commit your work
- When you are done, create an archive of your workspace (zip, tar.gz, tar...), including the .git folder, and send it to elie.sauveterre@haleoclinic.com
