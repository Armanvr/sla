interface BackLinkProps {
	href?: string
	label?: string
}

export function BackLink({ href = '/', label = '◄ Retour' }: BackLinkProps) {
	return (
		<a href={href} className='sla-back-link'>
			{label}
		</a>
	)
}
