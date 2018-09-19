import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "angularfire2/firestore";
import { first } from "rxjs/operators";

export interface Post {
  userId: string;
  job: string;
  displayName: string;
  createdAt: Date;
  image: string;
  content: string;
  likeCount: number;
  [key: string]: any;
}

export interface User {
  uid: string;
  accessToken: string;
  displayName: string;
  email: string;
  linkedin: string;
  createdAt: Date;
  updatedAt: Date;
  experience: any;
  skills: any;
  photoURL: string;
  maatschap: string;
  mobile: string;
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class DatabaseProvider {
  private postsRef: AngularFirestoreCollection<Post>;
  private usersRef: AngularFirestoreCollection<User>;
  private newsRef: AngularFirestoreCollection<any>;
  private jobsRef: AngularFirestoreCollection<any>;
  private profileExpRef: AngularFirestoreCollection<any>;
  private profileSkillsRef: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore) {
    this.postsRef = this.afs.collection("posts");
    this.usersRef = this.afs.collection("users");
    this.newsRef = this.afs.collection("news");
    this.jobsRef = this.afs.collection("jobs");
    this.profileExpRef = this.afs.collection("profile_experience");
    this.profileSkillsRef = this.afs.collection("profile_skills");
  }
  /// NEWS ///
  createNewsPosts(userId: string, data: any){
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const doc = { userId, createdAt, ...data };
    return this.newsRef.add(doc);
  }

  docExists(path: string) {
    return this.afs.doc(path).valueChanges().pipe(first()).toPromise();
 }

  getNewsPosts() {
    return this.afs.collection("news", ref => ref.limit(10)).valueChanges();
  }

  /// USER POSTS ///
  getRecentPosts() {
    return this.afs.collection<Post>("posts", ref =>
      ref.orderBy("createdAt", "desc").limit(20)
    );
  }

  getUserPosts(userId: string) {
    return this.afs.collection<Post>("posts", ref =>
      ref
        .orderBy("createdAt", "desc")
        .where("userId", "==", userId)
        .limit(10)
    );
  }

  getUser(userId: string) {
    return this.afs
      .collection<User>("users", ref => ref.where("uid", "==", userId))
      .valueChanges();
  }

  createPost(userId: string, data: Post) {
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const doc = { userId, createdAt, ...data };
    return this.postsRef.add(doc);
  }

  deletePost(id: string) {
    return this.postsRef.doc(id).delete();
  }

  //// USER ////
  updateProfile(userId:string, data: User) {
    const updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    const doc = { updatedAt, ...data };
    return this.afs.doc(`users/${userId}`).update(doc);
  }

  //// HEARTS ////
  createHeart(userId: string, post: Post) {
    const hearts = post.hearts || {};
    hearts[userId] = true;

    return this.afs.doc(`posts/${post.id}`).update({ hearts });
  }

  removeHeart(userId: string, post: Post) {
    const hearts = post.hearts;
    delete post.hearts[userId];

    return this.afs.doc(`posts/${post.id}`).update({ hearts });
  }

  /// PROFILE ///
  updateProfileExperience(userId: string, data: any):Promise<any> {
    const updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    const doc = { updatedAt, ...data };
    return this.afs.doc(`users/${userId}`).set(doc, {merge: true});
  }

  updateProfileSkills(userId: string, data: any) {
    const updatedAt = firebase.firestore.FieldValue.serverTimestamp();
    const doc = { updatedAt, ...data };
    return this.afs.doc(`users/${userId}`).set(doc, {merge: true});
  }

  //// RELATIONSHIPS ////
  getUsers() {
    return this.afs.collection("users", ref => ref.limit(10)).valueChanges();
  }

  follow(followerId: string, followedId: string) {
    const docId = this.concatIds(followerId, followedId);
    const createdAt = firebase.firestore.FieldValue.serverTimestamp();

    const data = {
      followerId,
      followedId,
      createdAt
    };

    return this.afs
      .collection("relationships")
      .doc(docId)
      .set(data);
  }

  unfollow(followerId: string, followedId: string) {
    const docId = this.concatIds(followerId, followedId);

    return this.afs
      .collection("relationships")
      .doc(docId)
      .delete();
  }

  isFollowing(followerId: string, followedId: string) {
    const docId = this.concatIds(followerId, followedId);

    return this.afs
      .collection("relationships")
      .doc(docId)
      .valueChanges();
  }

  // Helper to format the docId for relationships
  private concatIds(a: string, b: string) {
    return `${a}_${b}`;
  }
}
