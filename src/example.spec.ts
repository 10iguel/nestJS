class FriendList {
  friends = [];

  addFriends(name) {
    this.friends.push(name);
    this.announcedFriendship(name);
  }

  announcedFriendship(name) {
    global.console.log(`${name} is my friend now`);
  }

  removeFriend(name) {
    const idx = this.friends.indexOf(name);
    if (idx === -1) {
      throw new Error('There is not such a friend');
    }
    this.friends.splice(idx, 1);
  }
}

describe('FriendsLists', () => {
  let friendList;

  beforeEach(() => {
    friendList = new FriendList();
  });

  it('should be 0 friends for Now', function() {
    expect(friendList.friends.length).toEqual(0);
  });

  it('should add a friend to the list', function() {
    friendList.addFriends('Miguel');
    expect(friendList.friends.length).toEqual(1);
  });

  it('should announced a friend of mine', function() {
    friendList.announcedFriendship = jest.fn();
    expect(friendList.announcedFriendship).not.toHaveBeenCalled();
    friendList.addFriends('Miguel');
    expect(friendList.announcedFriendship).toHaveBeenCalled();
  });


  describe('remove Field', function() {
    it('should remove a friend from the list', function() {
      friendList.addFriends('Miguel');
      expect(friendList.friends[0]).toEqual('Miguel');
      friendList.removeFriend('Miguel');
      expect(friendList.friends[0]).toBeUndefined();
    });
    it('should throw an error if a friend does not exists', function() {
      expect(() => friendList.removeFriend('Miguel')).toThrow(new Error('There is not such a friend'));
    });

  });
});
