export const defaultPostTypes = [
  {
    id: 'event',
    title: 'Event',
    description: 'Group event post with users',
    structure: {
      location: 0,
      date: '',
      length: 0,
      users: [0]
    }
  },
  {
    id: 'poll',
    title: 'Poll',
    description: 'Poll post for voting',
    structure: {
      options: [
        {
          id: 0,
          title: '',
          users: []
        }
      ]
    }
  },
  {
    id: 'info',
    title: 'Info',
    description: 'Informational post',
    structure: {}
  }
];
