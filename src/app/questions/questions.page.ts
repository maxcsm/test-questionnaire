import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RedditService } from 'src/providers/reddit-service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.page.html',
  styleUrls: ['./questions.page.scss'],
})
export class QuestionsPage implements OnInit {

  id: number;
  questions = [];
  datareponse: any = [];
  title: any;
  question_label: any;
  options: any;
  email: any;
  checked: any;
  datarep: any = [];
  nbchecked: any;
  dataq: any;
  questionid: any;
  idquestion: any;
  completedAt: any;
  status: void;


  constructor(
    private route: ActivatedRoute, 
    public router: Router, 
    public redditService: RedditService, 
    public alertController: AlertController, 
    public storage: Storage,
  ) { }



  ngOnInit() {
   
  
    this.redditService.getAnwers().subscribe(data => {
      this.questions = data;

      for (var i = 0; i < this.questions.length; i++) {

      this.idquestion = this.questions[i].questions[0].id;
      this.completedAt = this.questions[i].completedAt;
      this.status=this.search(this.questions[i].answers[0].value, this.questions[i].questions[0].label);

        this.options = { 
          id: this.questions[i].questions[0].id,
          question:  this.questions[i].questions[0].label, 
          answer: this.questions[i].answers[0].value,
          isChecked: this.status,
          completedAt: this.completedAt
        };

        this.datareponse.push( this.options);
        this.ifExist(this.idquestion, this.completedAt);

      }

    })

  }

  // method returns the value of the array element 
  search(val, val2) {
    return this.state.find(x=>x.risk == val2 && x.answer == val ).status;
  }

  //method to check and delete if new value exist
  ifExist(idquestion,completedAt){

  this.datareponse.forEach((value, index) => {
  if (this.idquestion==value.id && this.completedAt > value.completedAt){
  this.datareponse.splice(index, 1);           
  }})}




  public state: any[] = [
    {risk:"RLS Risk",answer:"highRisk",status:true},
    {risk:"RLS Risk",answer:"lowRisk",status:false},
    {risk:"SWSD Risk",answer:"highRisk",status:true},
    {risk:"SWSD Risk",answer:"lowRisk",status:false},
    {risk:"Caffeine",answer:"sometimes",status:true},
    {risk:"Caffeine",answer:"always",status:true},
    {risk:"Caffeine",answer:"never",status:false},
    {risk:"Alcohol",answer:"sometimes",status:false},
    {risk:"Alcohol",answer:"always",status:false},
    {risk:"Alcohol",answer:"never",status:false}
    ];
    




}

