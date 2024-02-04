import React from 'react'
import { Avatar, AvatarGroup } from '@mui/material'

import './workspaceBage.scss'

export const WorkspaceBage = () => {
  return (
    <div className='workspace-bage'>
        <AvatarGroup max={4} total={10}>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
        </AvatarGroup>
    </div>
  )
}
