package com.enonic.app.alive;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.enonic.xp.context.Context;
import com.enonic.xp.context.ContextBuilder;
import com.enonic.xp.node.NodeService;
import com.enonic.xp.script.bean.BeanContext;
import com.enonic.xp.script.bean.ScriptBean;
import com.enonic.xp.security.RoleKeys;
import com.enonic.xp.security.SystemConstants;
import com.enonic.xp.security.User;
import com.enonic.xp.security.auth.AuthenticationInfo;

@SuppressWarnings({"UnstableApiUsage", "unused"})
public class AliveBean
    implements ScriptBean
{
    private NodeService nodeService;

    private Logger LOG = LoggerFactory.getLogger( AliveBean.class );

    private static Context runContext;

    @Override
    public void initialize( final BeanContext context )
    {

        this.nodeService = context.getService( NodeService.class ).get();
        runContext = ContextBuilder.create().
            repositoryId( SystemConstants.SYSTEM_REPO.getId() ).
            branch( SystemConstants.BRANCH_SYSTEM ).
            authInfo( AuthenticationInfo.create().
                principals( RoleKeys.ADMIN ).
                user( User.ANONYMOUS ).
                build() ).
            build();
    }

    public boolean isAlive()
    {
        try
        {
            runContext.callWith( () -> this.nodeService.getRoot() );
            return true;
        }
        catch ( Exception e )
        {
            LOG.error( "Alive check-failed", e );
            return false;
        }
    }

}
