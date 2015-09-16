package eu.cloudopting.bpmn.tasks.deploy;

import java.util.concurrent.TimeUnit;

import org.activiti.engine.delegate.DelegateExecution;
import org.activiti.engine.delegate.JavaDelegate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import eu.cloudopting.tosca.ToscaService;

@Service
public class DeployAcquireIp implements JavaDelegate {
	private final Logger log = LoggerFactory.getLogger(DeployAcquireIp.class);
	@Autowired
	ToscaService toscaService;

	@Override
	public void execute(DelegateExecution execution) throws Exception {
		// TODO Auto-generated method stub
		log.debug("in DeployAcquireIp");
		String customizationId = (String) execution.getVariable("customizationId");
		String cloudtask = (String) execution.getVariable("cloudtask");
		String cloudId = (String) execution.getVariable("cloudId");
		String vmId = (String) execution.getVariable("vmId");
		Long cloudAccountId = (Long) execution.getVariable("cloudAccountId");
		log.debug(vmId);
//		
//		toscaService.getNodeType(customizationId,"");
		// Remove the tosca customization
//		toscaService.removeToscaCustomization(customizationId);
		// delete the folder
		
		// remove the caches in dockerservice
		
	}

}
