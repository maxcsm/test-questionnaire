import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError, Observable, } from 'rxjs';
import { retry, } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Injectable()
export class RedditService {


  URLbase = "";

  language: string = "EN";
  exp: any;
  token: any;
  headers: HttpHeaders;
  email: any;





  constructor(public http: HttpClient, public storage: Storage,) {
   
  }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }


  ngOnInit() { }


  getSuveys(): Observable<any> {
    return this.http
      .get<any>("./assets/data/survey.json")
      .pipe(retry(2), catchError(this.handleError))
  }

  getAnwers(): Observable<any> {
    return this.http
      .get<any>("./assets/data/answer.json")
      .pipe(retry(2), catchError(this.handleError))
  }



  ////////////////////// REST API ////////////////////////////

  userByrole(page, tableuser, per_page, order_id, order_by, filter): Observable<any> {
    return this.http
      .get<any>(this.URLbase + tableuser + '?page=' + page + '&per_page=' + per_page + '&order_id=' + order_id + '&order_by=' + order_by + '&filter=' + filter)
      .pipe(retry(2), catchError(this.handleError))
  }
  postByid(table, id): Observable<any> {
    return this.http
      .get<any>(this.URLbase + table + '/' + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  addPost(data, table): Observable<any> {
    return this.http
      .post<any>(this.URLbase + table, data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }


  update(table, id, data): Observable<any> {
    return this.http
      .put<any>(this.URLbase + table + '/' + id, data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }


  getDataBypage(page, table, per_page, order_id, order_by, category, status, filter): Observable<any> {
    return this.http
      .get<any>(this.URLbase + table + '?page=' + page + '&per_page=' + per_page + '&order_id=' + order_id + '&order_by=' + order_by + '&filter=' + filter)
      .pipe(retry(2), catchError(this.handleError))
  }

  ///////////////////// AUTH ////////////////////////////////

  login(data): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'login', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  register(data): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'register', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  forgetpassword(data): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'forgotpassword', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  updateuserpassword(id,data): Observable<any> {
    return this.http
      .put<any>(this.URLbase + 'change_password'+ '/' +  id, data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  getPageList(): Observable<any> {
    return this.http
      .get<any>(this.URLbase + 'getPageList', this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  getDataBypage2(page, table, category, status): Observable<any> {
    return this.http
      .get<any>(this.URLbase + 'dataByPage/' + page + '?table=' + table + '&category=' + category + '&status=' + status, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }




  /////////////////// USER ///////////
  updateUser(data): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'updateuser', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

 

  updatePostTable(data): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'updatePostTable', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  deleteTable(data): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'deleteTable', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  searchByid(page, table, category, status, wordid): Observable<any> {
    return this.http
      .get<any>(this.URLbase + 'searchByid/' + page + '?table=' + table + '&category=' + category + '&status=' + status + '&wordid=' + wordid, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  searchByword(page, table, category, status, word, word1, word2): Observable<any> {
    return this.http
      .get<any>(this.URLbase + 'searchByword/' + page + '?table=' + table + '&category=' + category + '&status=' + status + '&word=' + word + '&word1=' + word1 + '&word2=' + word2, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }


  ///////PAGES 
  addPage(data): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'addPage', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  updatePage(data): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'updatePage', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  ///////USERS

  userExist(data): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'userexist', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }

  updateUserAdmin(data): Observable<any> {
    return this.http
      .post<any>(this.URLbase + 'updateuseradmin', data, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }







  ///////////LOG 

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };


  //////////////////////message////////////////////
  messageByUser(user_id, page, per_page, order_id, order_by, filter): Observable<any> {
    return this.http
      .get<any>(this.URLbase + 'threads_user_id/' + user_id + '?page=' + page + '&per_page=' + per_page + '&order_id=' + order_id + '&order_by=' + order_by + '&filter=' + filter)
      .pipe(retry(2), catchError(this.handleError))
  }
  messageByThreads(page, thread_id, per_page, order_id, order_by): Observable<any> {
    return this.http
      .get<any>(this.URLbase + 'messages' + '?page=' + page + '&thread_id=' + thread_id + '&per_page=' + per_page + '&order_id=' + order_id + '&order_by=' + order_by)
      .pipe(retry(2), catchError(this.handleError))

  }




  ////////////Quiz////////
  questionsByQuestionnaire(id_surbey): Observable<any> {
    return this.http
      .get<any>(this.URLbase + 'questions/questions_survey' + '/' + id_surbey, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))

  }

  ///////////appointements///////////////////////////
  appointementsByUser(user_id, page, per_page, order_id, order_by, filter): Observable<any> {
    return this.http
      .get<any>(this.URLbase + 'appointements/appointements_user' + '/' + user_id + '?page=' + page + '&per_page=' + per_page + '&order_id=' + order_id + '&order_by=' + order_by + '&filter=' + filter)
      .pipe(retry(2), catchError(this.handleError))

  }


  /////Notification/////
  notificationsByUser(user_id, page, per_page, order_id, order_by): Observable<any> {
    return this.http
      .get<any>(this.URLbase + 'notifications/notifications_user' + '/' + user_id + '?page=' + page + '&per_page=' + per_page + '&order_id=' + order_id + '&order_by=' + order_by)
      .pipe(retry(2), catchError(this.handleError))

  }


}
